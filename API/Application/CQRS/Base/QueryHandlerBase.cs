using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;
using Autofac.Extras.DynamicProxy;
using Application.Common.Attributes;
using Application.Common.Interceptors;

namespace Application.CQRS.Base;

[Intercept(typeof(PropertyInjectionInterceptor))]
public abstract class QueryHandlerBase<TQuery, TResult, TEntity> : IRequestHandler<TQuery, Response<TResult>>
    where TQuery : IRequest<Response<TResult>> 
    where TEntity : BaseEntity
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IMapper Mapper { get; set; } = null!;
    [Inject] protected ILogger<QueryHandlerBase<TQuery, TResult, TEntity>> Logger { get; set; } = null!;
    [Inject] protected IApplicationDbContext DbContext { get; set; } = null!;
    [Inject] protected ICurrentUserService CurrentUserService { get; set; } = null!;

    public virtual async Task<Response<TResult>> Handle(TQuery request, CancellationToken cancellationToken)
    {
        ValidateServices();
        
        try
        {
            var result = await HandleQuery(request, cancellationToken);
            return SuccessWithData(result);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error handling {QueryType}: {Message}", typeof(TQuery).Name, ex.Message);
            return Response<TResult>.ErrorResponse(500, ex.Message);
        }
    }

    protected abstract Task<TResult> HandleQuery(TQuery request, CancellationToken cancellationToken);
    
    protected Response<TResult> SuccessWithData(TResult data, string message = "Operation successful")
        => Response<TResult>.SuccessWithData(data, message);

    protected Response<ResponseBase> Success(string message = "Operation successful")
        => new Response<ResponseBase>
        {
            StatusCode = 200,
            Message = message,
            Success = true
        };

    protected Response<TResult> Error(int statusCode, string message)
        => Response<TResult>.ErrorResponse(statusCode, message);
        
    protected void ValidateServices()
    {
        if (Repository == null)
            throw new InvalidOperationException($"{nameof(Repository)} is not initialized");

        if (Mapper == null)
            throw new InvalidOperationException($"{nameof(Mapper)} is not initialized");

        if (Logger == null)
            throw new InvalidOperationException($"{nameof(Logger)} is not initialized");
            
        if (DbContext == null)
            throw new InvalidOperationException($"{nameof(DbContext)} is not initialized");
            
        if (CurrentUserService == null)
            throw new InvalidOperationException($"{nameof(CurrentUserService)} is not initialized");
    }
}