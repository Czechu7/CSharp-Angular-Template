using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Common;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Queries;

public class GetPagedQueryHandler<TResult, TEntity>(
    IGenericRepository<TEntity> repository,
    IMapper mapper,
    ILogger<GetPagedQueryHandler<TResult, TEntity>> logger)
    : QueryHandlerBase<GetPagedQuery<TResult, TEntity>, PagedResult<TResult>, TEntity>(repository, mapper, logger)
    where TEntity : BaseEntity
{
    protected override async Task<PagedResult<TResult>> HandleQuery(GetPagedQuery<TResult, TEntity> request, CancellationToken cancellationToken)
    {
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? ordering = null;
        if (!string.IsNullOrEmpty(request.SortBy))
        {
        }
        
        var pagedList = await Repository.GetPagedAsync(
            request.PageNumber,
            request.PageSize,
            request.Filter,
            ordering,
            request.IncludeInactive);
            
        return new PagedResult<TResult>
        {
            Items = Mapper.Map<List<TResult>>(pagedList.Items),
            PageNumber = pagedList.PageNumber,
            PageSize = pagedList.PageSize,
            TotalCount = pagedList.TotalCount,
            TotalPages = pagedList.TotalPages
        };
    }
}