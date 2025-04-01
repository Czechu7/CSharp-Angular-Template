using Application.Common.Attributes;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Interceptors;
using AutoMapper;
using Autofac.Extras.DynamicProxy;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Application.CQRS.Base.Queries;

[Intercept(typeof(PropertyInjectionInterceptor))]
public class GetPagedQueryHandler<TCommand, TResult, TEntity> : IRequestHandler<TCommand, Response<PagedResult<TResult>>>
    where TCommand : IRequest<Response<PagedResult<TResult>>>
    where TEntity : BaseEntity
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IMapper Mapper { get; set; } = null!;
    [Inject] protected ILogger<GetPagedQueryHandler<TCommand, TResult, TEntity>> Logger { get; set; } = null!;
    [Inject] protected IApplicationDbContext DbContext { get; set; } = null!;
    [Inject] protected ICurrentUserService CurrentUserService { get; set; } = null!;

    public virtual async Task<Response<PagedResult<TResult>>> Handle(TCommand request, CancellationToken cancellationToken)
    {
        try
        {
            dynamic typedRequest = request;
            int pageNumber = typedRequest.PageNumber;
            int pageSize = typedRequest.PageSize;
            string searchTerm = typedRequest.SearchTerm;
            string sortBy = typedRequest.SortBy;
            bool sortDescending = typedRequest.SortDescending;
            
            Expression<Func<TEntity, bool>>? filter = null;
            try 
            {
                filter = typedRequest.Filter;
            }
            catch 
            {

            }

            Logger.LogInformation("Getting paged {EntityType} entities: Page {Page}, Size {Size}", 
                typeof(TEntity).Name, pageNumber, pageSize);
            
            var result = await Repository.GetPagedAsync(
                pageNumber,
                pageSize,
                filter,
                !string.IsNullOrEmpty(sortBy) ? BuildSortExpression(sortBy, sortDescending) : null,
                !string.IsNullOrEmpty(searchTerm)
            );

    
            var pagedResult = new PagedResult<TResult>
            {
                Items = Mapper.Map<List<TResult>>(result.Items),
                Pagination = new PagedResult<TResult>.PaginationList
                {
                    PageNumber = result.PageNumber,
                    PageSize = result.PageSize,
                    TotalCount = result.TotalCount,
                    TotalPages = result.TotalPages
                }
            };
            
            return SuccessWithData(pagedResult, 
                $"Retrieved page {pagedResult.Pagination.PageNumber} of {pagedResult.Pagination.TotalPages} ({pagedResult.Items.Count} of {pagedResult.Pagination.TotalCount} {typeof(TEntity).Name} entities)");
        }
        catch (Common.Exceptions.ApplicationException ex)
        {
            Logger.LogWarning(ex, "Application error: {Message}", ex.Message);
            return Error(400, ex.Message);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error retrieving paged {EntityType} entities", typeof(TEntity).Name);
            return Error(500, $"Error retrieving paged {typeof(TEntity).Name} entities: {ex.Message}");
        }
    }

    private Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> BuildSortExpression(string sortBy, bool descending)
    {
        return query => descending 
            ? query.OrderByDescending(e => EF.Property<object>(e, sortBy))
            : query.OrderBy(e => EF.Property<object>(e, sortBy));
    }

    protected Response<PagedResult<TResult>> SuccessWithData(PagedResult<TResult> data, string message = "Operation successful")
        => Response<PagedResult<TResult>>.SuccessWithData(data, message);

    protected Response<PagedResult<TResult>> Error(int statusCode, string message)
        => Response<PagedResult<TResult>>.ErrorResponse(statusCode, message);
}