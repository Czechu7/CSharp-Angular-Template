using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Queries;
using AutoMapper;
using Domain.Common;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Queries;

public class GetAllQueryHandler<TResult, TEntity>(
    IGenericRepository<TEntity> repository,
    IMapper mapper,
    ILogger<GetAllQueryHandler<TResult, TEntity>> logger)
    : QueryHandlerBase<GetAllQuery<TResult>, List<TResult>, TEntity>(repository, mapper, logger)
    where TEntity : BaseEntity
{
    protected override async Task<List<TResult>> HandleQuery(GetAllQuery<TResult> request, CancellationToken cancellationToken)
    {
        var entities = await Repository.GetAllAsync(request.IncludeInactive);
        return Mapper.Map<List<TResult>>(entities);
    }
}