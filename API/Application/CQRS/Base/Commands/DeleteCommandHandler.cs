using Application.Common.Attributes;
using Application.Common.Exceptions;
using Application.Common.Interceptors;
using Application.Common.Interfaces;
using Application.Common.Models;
using Autofac.Extras.DynamicProxy;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Commands;
[Intercept(typeof(PropertyInjectionInterceptor))]
public class DeleteCommandHandler<TCommand, TResponse, TEntity> : IRequestHandler<TCommand, Response<TResponse>>
    where TCommand : IRequest<Response<TResponse>>
    where TEntity : BaseEntity
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IApplicationDbContext DbContext { get; set; } = null!;
    [Inject] protected ILogger<DeleteCommandHandler<TCommand, TResponse, TEntity>> Logger { get; set; } = null!;
    [Inject] protected ICurrentUserService CurrentUserService { get; set; } = null!;

    public virtual async Task<Response<TResponse>> Handle(TCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var id = ((dynamic)request).Id;
            
            if (!await Repository.ExistsAsync(id))
            {
                throw new NotFoundException(typeof(TEntity).Name, id);
            }   

            await ValidateDeleteAsync(id, cancellationToken);

            await Repository.DeleteAsync(id);
            
            
            return SuccessResponse($"{typeof(TEntity).Name} deleted successfully");
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
            var id = GetIdFromRequest(request);
            Logger.LogError(ex, "Error deleting {EntityType} with ID {EntityId}", typeof(TEntity).Name, id);
            return Error(500, $"Error deleting {typeof(TEntity).Name}: {ex.Message}");
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

    protected virtual Task ValidateDeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    protected virtual Response<TResponse> SuccessResponse(string message)
    {

        TResponse? data = default;
        if (typeof(TResponse).IsClass && !typeof(TResponse).IsAbstract)
        {
            try
            {
                data = Activator.CreateInstance<TResponse>();
            }
            catch
            {
         
            }
        }

        return new Response<TResponse>
        {
            StatusCode = 200,
            Message = message,
            Success = true,
            Data = data
        };
    }

    protected Response<TResponse> Error(int statusCode, string message)
        => Response<TResponse>.ErrorResponse(statusCode, message);
}