using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Queries;
using AutoMapper;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.CQRS;

public abstract class QueryHandlerBase<TQuery, TResult, TEntity> 
    : IRequestHandler<TQuery, Response<TResult>>
    where TQuery : IRequest<Response<TResult>>  // Updated to require only IRequest<Response<TResult>>
    where TEntity : BaseEntity
{
    protected readonly IGenericRepository<TEntity> Repository;
    protected readonly IMapper Mapper;
    protected readonly ILogger<QueryHandlerBase<TQuery, TResult, TEntity>> Logger;

    protected QueryHandlerBase(
        IGenericRepository<TEntity> repository,
        IMapper mapper,
        ILogger<QueryHandlerBase<TQuery, TResult, TEntity>> logger)
    {
        Repository = repository;
        Mapper = mapper;
        Logger = logger;
    }

    public virtual async Task<Response<TResult>> Handle(TQuery request, CancellationToken cancellationToken)
    {
        try
        {
            var result = await HandleQuery(request, cancellationToken);
            return Response<TResult>.SuccessResponse(result);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error handling {QueryType}: {Message}", typeof(TQuery).Name, ex.Message);
            return Response<TResult>.ErrorResponse(500, ex.Message);
        }
    }

    protected abstract Task<TResult> HandleQuery(TQuery request, CancellationToken cancellationToken);
}