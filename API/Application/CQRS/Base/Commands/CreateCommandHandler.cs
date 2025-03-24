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
public class CreateCommandHandler<TDto, TEntity> : BaseCommandHandler<CreateCommand<TDto>, ResponseBase>
    where TEntity : BaseEntity, new()
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IMapper Mapper { get; set; } = null!;


    public override async Task<Response<ResponseBase>> Handle(CreateCommand<TDto> request, CancellationToken cancellationToken)
    {
        try
        {
            var entity = Mapper.Map<TEntity>(request.Data);

            await ValidateCreateAsync(entity, request.Data, cancellationToken);

            await Repository.AddAsync(entity);

            Logger.LogInformation("Created {EntityType} with ID {EntityId}", typeof(TEntity).Name, entity.Id);

            return Success($"{typeof(TEntity).Name} created successfully");
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
            Logger.LogError(ex, "Error creating {EntityType}", typeof(TEntity).Name);
            return Error(500, $"Error creating {typeof(TEntity).Name}: {ex.Message}");
        }
    }
    protected virtual Task ValidateCreateAsync(TEntity entity, TDto dto, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }
}