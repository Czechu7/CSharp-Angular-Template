using Application.Common.Attributes;
using Application.Common.Exceptions;
using Application.Common.Interceptors;
using Application.Common.Interfaces;
using Application.Common.Models;
using Autofac.Extras.DynamicProxy;
using AutoMapper;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Text;

namespace Application.CQRS.Base.Commands;

[Intercept(typeof(PropertyInjectionInterceptor))]
public class UpdateCommandHandler<TCommand, TResponse, TDto, TEntity> : IRequestHandler<TCommand, Response<TResponse>>
    where TCommand : IRequest<Response<TResponse>>
    where TEntity : BaseEntity
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IMapper Mapper { get; set; } = null!;
    [Inject] protected IApplicationDbContext DbContext { get; set; } = null!;
    [Inject] protected ILogger<UpdateCommandHandler<TCommand, TResponse, TDto, TEntity>> Logger { get; set; } = null!;
    [Inject] protected ICurrentUserService CurrentUserService { get; set; } = null!;

    public virtual async Task<Response<TResponse>> Handle(TCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var id = ((dynamic)request).Id;
            var dto = ((dynamic)request).Data;

            var entity = await Repository.GetByIdAsync(id) ?? 
                throw new NotFoundException(typeof(TEntity).Name, id);
            
            await ValidateUpdateAsync(entity, dto, cancellationToken);
            
            Mapper.Map(dto, entity);
            
            await HandleUpdateAsync(entity, dto, cancellationToken);
            
            await Repository.UpdateAsync(entity);
            
            var response = await CreateResponseFromEntityAsync(entity, dto, cancellationToken);
            
            return SuccessWithData(response, $"{typeof(TEntity).Name} updated successfully");
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
            var id = GetIdFromRequest(request);
            Logger.LogError(ex, "Error updating {EntityType} with ID {EntityId}", typeof(TEntity).Name, id);
            return Error(500, $"Error updating {typeof(TEntity).Name}: {ex.Message}");
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

    protected virtual Task ValidateUpdateAsync(TEntity entity, TDto dto, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    protected virtual Task HandleUpdateAsync(TEntity entity, TDto dto, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    protected virtual async Task<TResponse> CreateResponseFromEntityAsync(TEntity entity, TDto dto, CancellationToken cancellationToken)
    {
        try 
        {
            var response = Activator.CreateInstance<TResponse>();
            
            await Task.Yield();
            
            Mapper.Map(entity, response);
            
            return response;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error creating response from entity");
            throw new InvalidOperationException(
                $"Could not create response of type {typeof(TResponse).Name} from entity {typeof(TEntity).Name}. " +
                $"Override CreateResponseFromEntityAsync in your handler to provide custom response creation logic.", ex);
        }
    }

    protected Response<TResponse> SuccessWithData(TResponse data, string message = "Operation successful")
        => Response<TResponse>.SuccessWithData(data, message);

    protected Response<ResponseBase> Success(string message = "Operation successful")
        => new Response<ResponseBase>
        {
            StatusCode = 200,
            Message = message,
            Success = true
        };

    protected Response<TResponse> Error(int statusCode, string message)
        => Response<TResponse>.ErrorResponse(statusCode, message);
}