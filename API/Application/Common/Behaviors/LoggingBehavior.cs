using System;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.Common.Behaviors;

public class LoggingBehavior<TRequest, TResponse>(
    ILogger<LoggingBehavior<TRequest, TResponse>> logger,
    ICassandraLogService cassandraLogger,
    ICurrentUserService currentUserService) : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly ILogger<LoggingBehavior<TRequest, TResponse>> _logger = logger;
    private readonly ICassandraLogService _cassandraLogger = cassandraLogger;
    private readonly ICurrentUserService _currentUserService = currentUserService;

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        var requestGuid = Guid.NewGuid().ToString();
        var userId = _currentUserService.UserId;

        _logger.LogInformation("Handling {RequestName} {RequestGuid}", requestName, requestGuid);

        var stopwatch = Stopwatch.StartNew();
        
        try
        {
            var response = await next();
            stopwatch.Stop();
            
            _logger.LogInformation("Handled {RequestName} {RequestGuid} in {ElapsedMilliseconds}ms", 
                requestName, requestGuid, stopwatch.ElapsedMilliseconds);
            
            
            
            if (IsUnauthorizedResponse(response, out var statusCode, out var message))
            {
                await _cassandraLogger.LogSecurityEventAsync(
                    userId: userId ?? "anonymous",
                    action: requestName,
                    resource: request.GetType().Name,
                    resourceId: TryGetResourceId(request),
                    result: "Denied",
                    statusCode: statusCode,
                    message: message);
            }
                
            return response;
        }
        catch (Exception ex)
        {
            stopwatch.Stop();
            _logger.LogError(ex, "Error handling {RequestName} {RequestGuid}", requestName, requestGuid);
            
            
            await _cassandraLogger.LogApplicationErrorAsync(
                ex, 
                $"Error in {requestName}", 
                userId);
            
            throw;
        }
    }
    
    private string TryGetResourceId(TRequest request)
    {
        
        try
        {
            
            var idProperty = request.GetType().GetProperty("Id") ?? 
                            request.GetType().GetProperty("EntityId");
            
            if (idProperty != null)
            {
                var value = idProperty.GetValue(request)?.ToString();
                return !string.IsNullOrEmpty(value) ? value : "unknown";
            }
        }
        catch(Exception ex)
        {
            _logger.LogDebug(ex, "Failed to retrieve resource ID for request of type {RequestType}", request.GetType().Name);
        }
        
        return "unknown";
    }

    private bool IsUnauthorizedResponse(TResponse response, out int statusCode, out string message)
    {
        statusCode = 0;
        message = string.Empty;
        
        
        if (response is Application.Common.Models.ResponseBase baseResponse)
        {
            statusCode = baseResponse.StatusCode;
            message = baseResponse.Message;
            return statusCode == 401 || statusCode == 403;
        }
        
        
        try
        {
            var responseProperty = response?.GetType().GetProperty("Response")?.GetValue(response);
            if (responseProperty is Application.Common.Models.ResponseBase responseBase)
            {
                statusCode = responseBase.StatusCode;
                message = responseBase.Message;
                return statusCode == 401 || statusCode == 403;
            }
            
            
            var resultType = response?.GetType();
            if (resultType?.Name.Contains("ActionResult") == true || 
                resultType?.Name.Contains("ObjectResult") == true)
            {
                
                var statusCodeProperty = resultType.GetProperty("StatusCode");
                if (statusCodeProperty != null)
                {
                    var statusCodeValue = statusCodeProperty.GetValue(response);
                    if (statusCodeValue != null && int.TryParse(statusCodeValue.ToString(), out int code))
                    {
                        statusCode = code;
                        
                        
                        var valueProperty = resultType.GetProperty("Value");
                        if (valueProperty != null)
                        {
                            var value = valueProperty.GetValue(response);
                            message = value?.ToString() ?? "Access denied";
                        }
                        else
                        {
                            message = "Access denied";
                        }
                        
                        return statusCode == 401 || statusCode == 403;
                    }
                }
            }
        }
        catch
        {
            
        }
        
        return false;
    }
}