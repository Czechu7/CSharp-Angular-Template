using Application.Common.Attributes;
using Application.Common.Exceptions;
using Application.Common.Interceptors;
using Application.Common.Interfaces;
using Application.Common.Models;
using Autofac.Extras.DynamicProxy;
using Domain.Common;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Commands;
[Intercept(typeof(PropertyInjectionInterceptor))]
public class DeleteCommandHandler<TEntity> : BaseCommandHandler<DeleteCommand, ResponseBase>
    where TEntity : BaseEntity
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;

    public override async Task<Response<ResponseBase>> Handle(DeleteCommand request, CancellationToken cancellationToken)
    {
        try
        {
            if (!await Repository.ExistsAsync(request.Id))
            {
                throw new NotFoundException(typeof(TEntity).Name, request.Id);
            }   

            await ValidateDeleteAsync(request.Id, cancellationToken);

            await Repository.DeleteAsync(request.Id);
            
            Logger.LogInformation("Deleted {EntityType} with ID {EntityId}", typeof(TEntity).Name, request.Id);
            
            return Success($"{typeof(TEntity).Name} deleted successfully");
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
            Logger.LogError(ex, "Error deleting {EntityType} with ID {EntityId}", typeof(TEntity).Name, request.Id);
            return Error(500, $"Error deleting {typeof(TEntity).Name}: {ex.Message}");
        }
    }


    protected virtual Task ValidateDeleteAsync(Guid id, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}