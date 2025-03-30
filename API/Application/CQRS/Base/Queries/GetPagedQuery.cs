using System.Linq.Expressions;
using Application.Common.Models;
using Application.Common.Queries;

namespace Application.CQRS.Base.Queries;

public class GetPagedQuery<TResult, TEntity> : IQuery<PagedResult<TResult>>
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public Expression<Func<TEntity, bool>>? Filter { get; set; }
    public string? SortBy { get; set; }
    public bool SortDescending { get; set; }
    public string? SearchTerm { get; set; }

    public GetPagedQuery(int pageNumber, int pageSize, string? searchTerm = null)
    {
        PageNumber = pageNumber > 0 ? pageNumber : 1;
        PageSize = pageSize > 0 ? pageSize : 10;
        SearchTerm = searchTerm;
    }
}