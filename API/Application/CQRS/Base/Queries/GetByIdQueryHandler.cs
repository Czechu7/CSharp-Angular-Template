using Application.Common.Attributes;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Interceptors;
using AutoMapper;
using Autofac.Extras.DynamicProxy;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Queries;

[Intercept(typeof(PropertyInjectionInterceptor))]
public class GetByIdQueryHandler<TCommand, TResult, TEntity> : IRequestHandler<TCommand, Response<TResult>>
    where TCommand : IRequest<Response<TResult>>
    where TEntity : BaseEntity
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IMapper Mapper { get; set; } = null!;
    [Inject] protected ILogger<GetByIdQueryHandler<TCommand, TResult, TEntity>> Logger { get; set; } = null!;
    [Inject] protected IApplicationDbContext DbContext { get; set; } = null!;
    [Inject] protected ICurrentUserService CurrentUserService { get; set; } = null!;

    public virtual async Task<Response<TResult>> Handle(TCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var id = ((dynamic)request).Id;
            
            var entity = await Repository.GetByIdAsync(id);
            
            if (entity == null)
            {
                throw new NotFoundException(typeof(TEntity).Name, id);
            }
            
            
            var result = Mapper.Map<TResult>(entity);
            
            return SuccessWithData(result, $"Retrieved {typeof(TEntity).Name}");
        }
        catch (NotFoundException ex)
        {
            Logger.LogWarning(ex, "Entity not found: {Message}", ex.Message);
            return Error(404, ex.Message);
        }
        catch (Common.Exceptions.ApplicationException ex)
        {
            Logger.LogWarning(ex, "Application error: {Message}", ex.Message);
            return Error(400, ex.Message);
        }
        catch (Exception ex)
        {
            Guid id = GetIdFromRequest(request);
            Logger.LogError(ex, "Error retrieving {EntityType} with ID {EntityId}", typeof(TEntity).Name, id);
            return Error(500, $"Error retrieving {typeof(TEntity).Name}: {ex.Message}");
        }
    }
    
    private Guid GetIdFromRequest(TCommand request)
    {
        try
        {
            return ((dynamic)request).Id;
        }
        catch
        {
            return Guid.Empty;
        }
    }

    protected Response<TResult> SuccessWithData(TResult data, string message = "Operation successful")
        => Response<TResult>.SuccessWithData(data, message);

    protected Response<TResult> Error(int statusCode, string message)
        => Response<TResult>.ErrorResponse(statusCode, message);
}