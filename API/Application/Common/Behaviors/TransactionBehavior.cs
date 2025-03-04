using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.Common.Behaviors;

public class TransactionBehavior<TRequest, TResponse>(
    IApplicationDbContext dbContext,
    ILogger<TransactionBehavior<TRequest, TResponse>> logger) : IPipelineBehavior<TRequest, TResponse>
    where TRequest : notnull
{
    private readonly IApplicationDbContext _dbContext = dbContext;
    private readonly ILogger<TransactionBehavior<TRequest, TResponse>> _logger = logger;

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var requestName = typeof(TRequest).Name;
        
        try
        {
            if (_dbContext.HasActiveTransaction)
            {
                return await next();
            }

            var strategy = _dbContext.Database.CreateExecutionStrategy();

            return await strategy.ExecuteAsync(async () =>
            {
                using (var transaction = await _dbContext.BeginTransactionAsync())
                {
                    _logger.LogInformation("Beginning transaction for {RequestName}", requestName);
                    
                    var response = await next();
                    
                    await _dbContext.CommitTransactionAsync(transaction);
                    _logger.LogInformation("Committed transaction for {RequestName}", requestName);
                    
                    return response;
                }
            });
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error handling transaction for {RequestName}", requestName);
            throw;
        }
    }
}