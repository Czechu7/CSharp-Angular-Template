using Application.Common.Attributes;
using Application.Common.Exceptions;
using Application.Common.Interceptors;
using Application.Common.Interfaces;
using Application.Common.Models;
using Autofac.Extras.DynamicProxy;
using AutoMapper;
using Domain.Common;
using Microsoft.Extensions.Logging;
using System.Text;

namespace Application.CQRS.Base.Commands;

[Intercept(typeof(PropertyInjectionInterceptor))]
public class UpdateCommandHandler<TDto, TEntity> : BaseCommandHandler<UpdateCommand<TDto>, ResponseBase>
    where TEntity : BaseEntity
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IMapper Mapper { get; set; } = null!;

    public override async Task<Response<ResponseBase>> Handle(UpdateCommand<TDto> request, CancellationToken cancellationToken)
    {
        try
        {
            var entity = await Repository.GetByIdAsync(request.Id) ?? throw new NotFoundException(typeof(TEntity).Name, request.Id);
            await ValidateUpdateAsync(entity, request.Data, cancellationToken);
            
            Mapper.Map(request.Data, entity);
            
            await Repository.UpdateAsync(entity);
            
            Logger.LogInformation("Updated {EntityType} with ID {EntityId}", typeof(TEntity).Name, entity.Id);
            
            return Success($"{typeof(TEntity).Name} updated successfully");
        }
        catch (NotFoundException ex)
        {
            Logger.LogWarning(ex, "Entity not found: {Message}", ex.Message);
            return Error(404, ex.Message);
        }
        catch (ValidationException ex)
        {
            var errorMessage = new StringBuilder("Validation failed: ");
            foreach (var error in ex.Errors)
            {
                errorMessage.AppendLine($"{error.Key}: {string.Join(", ", error.Value)}");
            }
            
            Logger.LogWarning(ex, "Validation failed: {Errors}", 
                string.Join(", ", ex.Errors.Select(e => $"{e.Key}: {string.Join(", ", e.Value)}")));
            
            return Error(400, errorMessage.ToString());
        }
        catch (Common.Exceptions.ApplicationException ex)
        {
            Logger.LogWarning(ex, "Application error: {Message}", ex.Message);
            return Error(400, ex.Message);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error updating {EntityType} with ID {EntityId}", typeof(TEntity).Name, request.Id);
            return Error(500, $"Error updating {typeof(TEntity).Name}: {ex.Message}");
        }
    }


    protected virtual Task ValidateUpdateAsync(TEntity entity, TDto dto, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}