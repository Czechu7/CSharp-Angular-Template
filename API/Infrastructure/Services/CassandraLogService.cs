using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Cassandra;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Services;

public class CassandraLogService : ICassandraLogService, IDisposable
{
    private readonly ILogger<CassandraLogService> _logger;
    private readonly Cluster _cluster;
    private readonly Cassandra.ISession _session;
    private readonly string _keyspace;
    
    private const string SECURITY_EVENTS_TABLE = "security_events";
    private const string APPLICATION_ERRORS_TABLE = "application_errors";

    public CassandraLogService(
        ILogger<CassandraLogService> logger,
        IConfiguration configuration)
    {
        _logger = logger;
        
        var cassandraConfig = configuration.GetSection("Cassandra");
        _keyspace = cassandraConfig["Keyspace"] ?? "logging";
        
        try
        {
            var contactPoints = cassandraConfig["ContactPoints"] ?? "localhost";
            var port = int.Parse(cassandraConfig["Port"] ?? "9042");
            var username = cassandraConfig["Username"];
            var password = cassandraConfig["Password"];
            
            var builder = Cluster.Builder()
                .AddContactPoint(contactPoints)
                .WithPort(port);
                
            
            if (!string.IsNullOrEmpty(username) && !string.IsNullOrEmpty(password))
            {
                builder.WithCredentials(username, password);
            }
            
            _cluster = builder.Build();
            
            
            using (var systemSession = _cluster.Connect("system"))
            {
                
                var checkKeyspaceQuery = $"SELECT keyspace_name FROM system_schema.keyspaces WHERE keyspace_name = '{_keyspace}'";
                var keyspaceExists = systemSession.Execute(checkKeyspaceQuery).Any();
                
                if (!keyspaceExists)
                {
                    _logger.LogInformation("Creating keyspace {KeyspaceName}", _keyspace);
                    
                    
                    var replicationStrategy = cassandraConfig["ReplicationStrategy"] ?? "SimpleStrategy";
                    var replicationFactor = int.Parse(cassandraConfig["ReplicationFactor"] ?? "1");
                    
                    var createKeyspaceQuery = $@"
                        CREATE KEYSPACE {_keyspace}
                        WITH REPLICATION = {{ 'class' : '{replicationStrategy}', 'replication_factor' : {replicationFactor} }}";
                    
                    systemSession.Execute(createKeyspaceQuery);
                    _logger.LogInformation("Keyspace {KeyspaceName} created successfully", _keyspace);
                }
            }
            
            
            _session = _cluster.Connect(_keyspace);
            
            
            CreateTablesIfNotExist();
            
            _logger.LogInformation("Successfully connected to Cassandra cluster");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to initialize Cassandra connection");
            throw;
        }
    }

    private void CreateTablesIfNotExist()
    {
        try
        {
            
            var createSecurityTableQuery = $@"
                CREATE TABLE IF NOT EXISTS {SECURITY_EVENTS_TABLE} (
                    day_bucket text,
                    timestamp timestamp,
                    id uuid,
                    user_id text,
                    ip_address text,
                    action text,
                    resource text,
                    resource_id text,
                    result text,
                    status_code int,
                    message text,
                    additional_data text,
                    PRIMARY KEY ((day_bucket), timestamp, id)
                ) WITH CLUSTERING ORDER BY (timestamp DESC)";
            
            _session.Execute(createSecurityTableQuery);
            
            
            var createErrorsTableQuery = $@"
                CREATE TABLE IF NOT EXISTS {APPLICATION_ERRORS_TABLE} (
                    day_bucket text,
                    timestamp timestamp,
                    id uuid,
                    user_id text,
                    context text,
                    exception_type text,
                    exception_message text,
                    stack_trace text,
                    PRIMARY KEY ((day_bucket), timestamp, id)
                ) WITH CLUSTERING ORDER BY (timestamp DESC)";
            
            _session.Execute(createErrorsTableQuery);
            
            _logger.LogInformation("Cassandra tables initialized successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to initialize Cassandra tables");
            throw;
        }
    }

    public async Task LogSecurityEventAsync(
        string userId, 
        string action, 
        string resource, 
        string resourceId, 
        string result, 
        int statusCode,
        string? ipAddress = null,
        string? message = null,
        string? additionalData = null)
    {
        try
        {
            var now = DateTimeOffset.UtcNow;
            var dayBucket = now.ToString("yyyy-MM-dd");
            var id = Guid.NewGuid();
            
            var query = $@"
                INSERT INTO {_keyspace}.{SECURITY_EVENTS_TABLE} 
                (day_bucket, timestamp, id, user_id, ip_address, action, resource, resource_id, result, status_code, message, additional_data) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                
            var statement = _session.Prepare(query);
            var boundStatement = statement.Bind(
                dayBucket,
                now,
                id,
                userId,
                ipAddress ?? "unknown",
                action,
                resource,
                resourceId,
                result,
                statusCode,
                message,
                additionalData
            );
            
            await _session.ExecuteAsync(boundStatement);
            
            var sanitizedAction = action.Replace("\r", "").Replace("\n", "");
                        var sanitizedIpAddress = (ipAddress ?? "unknown").Replace("\r", "").Replace("\n", "");
            _logger.LogDebug("Security event logged to Cassandra: {Action} for {Resource} from IP {IpAddress}", 
                                sanitizedAction, resource, sanitizedIpAddress);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to log security event to Cassandra");
        }
    }

    public async Task LogApplicationErrorAsync(
        Exception exception,
        string context,
        string? userId = null)
    {
        try
        {
            var now = DateTimeOffset.UtcNow;
            var dayBucket = now.ToString("yyyy-MM-dd");
            var id = Guid.NewGuid();
            
            var query = $@"
                INSERT INTO {_keyspace}.{APPLICATION_ERRORS_TABLE} 
                (day_bucket, timestamp, id, user_id, context, exception_type, exception_message, stack_trace) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                
            var statement = _session.Prepare(query);
            var boundStatement = statement.Bind(
                dayBucket,
                now,
                id,
                userId ?? "anonymous",
                context,
                exception.GetType().Name,
                exception.Message,
                exception.StackTrace
            );
            
            await _session.ExecuteAsync(boundStatement);
            
            var sanitizedContext = context.Replace("\r", "").Replace("\n", "");
            _logger.LogDebug("Application error logged to Cassandra: {ExceptionType} in {Context}", 
                exception.GetType().Name, sanitizedContext);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to log application error to Cassandra");
        }
    }

    public async Task<IEnumerable<SecurityEventLog>> GetSecurityEventsAsync(
        string? userId = null, 
        DateTime? fromDate = null, 
        DateTime? toDate = null,
        int? statusCode = null,
        int limit = 100)
    {
        try
        {
            var allResults = new List<SecurityEventLog>();
            
            
            if (!fromDate.HasValue) fromDate = DateTime.UtcNow.Date;
            if (!toDate.HasValue) toDate = fromDate.Value.AddDays(1).AddMilliseconds(-1);
            
            
            var currentDate = fromDate.Value.Date;
            var endDate = toDate.Value.Date;
            var dayBuckets = new List<string>();
            
            while (currentDate <= endDate)
            {
                dayBuckets.Add(currentDate.ToString("yyyy-MM-dd"));
                currentDate = currentDate.AddDays(1);
            }
            
            
            foreach (var dayBucket in dayBuckets)
            {
                var query = new StringBuilder($"SELECT * FROM {_keyspace}.{SECURITY_EVENTS_TABLE} WHERE day_bucket = ?");
                var parameters = new List<object> { dayBucket };
                
                
                if (fromDate.HasValue && dayBucket == fromDate.Value.ToString("yyyy-MM-dd"))
                {
                    query.Append(" AND timestamp >= ?");
                    parameters.Add(fromDate.Value);
                }
                
                if (toDate.HasValue && dayBucket == toDate.Value.ToString("yyyy-MM-dd"))
                {
                    query.Append(" AND timestamp <= ?");
                    parameters.Add(toDate.Value);
                }
                
                
                query.Append(" LIMIT ?");
                parameters.Add(limit);
                
                var statement = _session.Prepare(query.ToString());
                var boundStatement = statement.Bind(parameters.ToArray());
                
                var resultSet = await _session.ExecuteAsync(boundStatement);
                
                
                var dayResults = resultSet
                    .Select(row => new SecurityEventLog
                    {
                        Id = row.GetValue<Guid>("id"),
                        Timestamp = row.GetValue<DateTimeOffset>("timestamp"),
                        UserId = row.GetValue<string>("user_id"),
                        IpAddress = row.GetValue<string>("ip_address"),  
                        Action = row.GetValue<string>("action"),
                        Resource = row.GetValue<string>("resource"),
                        ResourceId = row.GetValue<string>("resource_id"),
                        Result = row.GetValue<string>("result"),
                        StatusCode = row.GetValue<int>("status_code"),
                        Message = row.GetValue<string>("message"),
                        AdditionalData = row.GetValue<string>("additional_data")
                    });
                    
                
                if (!string.IsNullOrEmpty(userId))
                {
                    dayResults = dayResults.Where(log => log.UserId == userId);
                }
                
                if (statusCode.HasValue)
                {
                    dayResults = dayResults.Where(log => log.StatusCode == statusCode.Value);
                }
                
                allResults.AddRange(dayResults);
                
                
                if (allResults.Count >= limit)
                {
                    break;
                }
            }
            
            
            return allResults
                .OrderByDescending(log => log.Timestamp)
                .Take(limit);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve security events from Cassandra");
            throw;
        }
    }

    public async Task<IEnumerable<ApplicationErrorLog>> GetApplicationErrorsAsync(
        string? userId = null, 
        DateTime? fromDate = null, 
        DateTime? toDate = null,
        int limit = 100)
    {
        try
        {
            var query = new StringBuilder($"SELECT * FROM {_keyspace}.{APPLICATION_ERRORS_TABLE}");
            var parameters = new List<object>();
            var conditions = new List<string>();
            
            
            if (!string.IsNullOrEmpty(userId))
            {
                conditions.Add("user_id = ?");
                parameters.Add(userId);
            }
            
            if (fromDate.HasValue)
            {
                conditions.Add("timestamp >= ?");
                parameters.Add(fromDate.Value);
            }
            
            if (toDate.HasValue)
            {
                conditions.Add("timestamp <= ?");
                parameters.Add(toDate.Value);
            }
            
            if (conditions.Any())
            {
                query.Append(" WHERE " + string.Join(" AND ", conditions));
                query.Append(" ALLOW FILTERING");
            }
            
            
            query.Append(" LIMIT ?");
            parameters.Add(limit);
            
            var statement = _session.Prepare(query.ToString());
            var boundStatement = statement.Bind(parameters.ToArray());
            
            var resultSet = await _session.ExecuteAsync(boundStatement);
            
            
            return resultSet
                .Select(row => new ApplicationErrorLog
                {
                    Id = row.GetValue<Guid>("id"),
                    Timestamp = row.GetValue<DateTimeOffset>("timestamp"),
                    UserId = row.GetValue<string>("user_id"),
                    Context = row.GetValue<string>("context"),
                    ExceptionType = row.GetValue<string>("exception_type"),
                    ExceptionMessage = row.GetValue<string>("exception_message"),
                    StackTrace = row.GetValue<string>("stack_trace")
                })
                .OrderByDescending(log => log.Timestamp)
                .Take(limit);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to retrieve application errors from Cassandra");
            throw;
        }
    }

    public void Dispose()
    {
        _session?.Dispose();
        _cluster?.Dispose();
    }
}