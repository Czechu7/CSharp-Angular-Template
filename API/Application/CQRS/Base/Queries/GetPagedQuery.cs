using System.Linq.Expressions;
using Application.Common.Models;
using Application.Common.Queries;
using MediatR;

namespace Application.CQRS.Base.Queries;

public class GetPagedQuery<TResult, TEntity>(int pageNumber, int pageSize, bool includeInactive = false) : 
    IQuery<PagedResult<TResult>>, 
    IRequest<Response<PagedResult<TResult>>>
{
    public int PageNumber { get; set; } = pageNumber > 0 ? pageNumber : 1;
    public int PageSize { get; set; } = pageSize > 0 ? pageSize : 10;
    public Expression<Func<TEntity, bool>>? Filter { get; set; }
    public string? SortBy { get; set; }
    public bool SortDescending { get; set; }
    public bool IncludeInactive { get; set; } = includeInactive;
}