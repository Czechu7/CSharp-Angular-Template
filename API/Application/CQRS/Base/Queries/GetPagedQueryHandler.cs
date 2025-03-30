using Application.Common.Models;
using Domain.Common;
using Autofac.Extras.DynamicProxy;
using Application.Common.Interceptors;
using Microsoft.EntityFrameworkCore;

namespace Application.CQRS.Base.Queries;

[Intercept(typeof(PropertyInjectionInterceptor))]
public class GetPagedQueryHandler<TResult, TEntity> : QueryHandlerBase<GetPagedQuery<TResult, TEntity>, PagedResult<TResult>, TEntity>
    where TEntity : BaseEntity
{
    protected override async Task<PagedResult<TResult>> HandleQuery(GetPagedQuery<TResult, TEntity> request, CancellationToken cancellationToken)
    {
        var result = await Repository.GetPagedAsync(
            request.PageNumber,
            request.PageSize,
            request.Filter,
            request.SortBy != null ? BuildSortExpression(request.SortBy, request.SortDescending) : null,
            !string.IsNullOrEmpty(request.SearchTerm)
        );

        return new PagedResult<TResult>
        {
            Items = Mapper.Map<List<TResult>>(result.Items),
            PageNumber = result.PageNumber,
            PageSize = result.PageSize,
            TotalCount = result.TotalCount,
            TotalPages = result.TotalPages
        };
    }

    private Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> BuildSortExpression(string sortBy, bool descending)
    {
        return query => descending 
            ? query.OrderByDescending(e => EF.Property<object>(e, sortBy))
            : query.OrderBy(e => EF.Property<object>(e, sortBy));
    }
}