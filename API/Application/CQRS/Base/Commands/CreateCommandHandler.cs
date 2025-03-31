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
public class CreateCommandHandler<TCommand, TResponse, TDto, TEntity> : IRequestHandler<TCommand, Response<TResponse>>
    where TCommand : IRequest<Response<TResponse>>
    where TEntity : BaseEntity

{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IMapper Mapper { get; set; } = null!;
    [Inject] protected IApplicationDbContext DbContext { get; set; } = null!;
    [Inject] protected ILogger<CreateCommandHandler<TCommand, TResponse, TDto, TEntity>> Logger { get; set; } = null!;
    [Inject] protected ICurrentUserService CurrentUserService { get; set; } = null!;
    [Inject] protected IPasswordService PasswordService { get; set; } = null!;
    [Inject] protected ITokenService TokenService { get; set; } = null!;

    public virtual async Task<Response<TResponse>> Handle(TCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var dto = ((dynamic)request).Data;

            var entity = Mapper.Map<TEntity>(dto);

            await ValidateCreateAsync(entity, dto, cancellationToken);

            await HandleCreate(entity, dto, cancellationToken);

            await Repository.AddAsync(entity);
            await DbContext.SaveChangesAsync(cancellationToken);

            if (typeof(TResponse) == typeof(ResponseBase))
            {
                return Success($"{typeof(TEntity).Name} created successfully");
            }


            var response = await CreateResponseFromEntityAsync(entity, dto, cancellationToken);
            Mapper.Map(entity, response);

            return SuccessWithData(response, $"{typeof(TEntity).Name} created successfully");
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


    protected virtual async Task<TResponse> CreateResponseFromEntityAsync(TEntity entity, TDto dto, CancellationToken cancellationToken)
    {
        try
        {

            if (typeof(TResponse) == typeof(ResponseBase))
            {
                return (TResponse)(object)new ResponseBase();
            }

            var response = Activator.CreateInstance<TResponse>();
            await Task.Yield();

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
    protected virtual Task ValidateCreateAsync(TEntity entity, TDto dto, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }

    protected virtual Task HandleCreate(TEntity entity, TDto dto, CancellationToken cancellationToken)
    {
        return Task.CompletedTask;
    }


    protected Response<TResponse> SuccessWithData(TResponse data, string message = "Operations successful")
        => Response<TResponse>.SuccessWithData(data, message);

    protected Response<TResponse> Success(string message = "Operation successful")
        => new Response<TResponse>
        {
            StatusCode = 200,
            Message = message,
            Success = true
        };

    protected Response<TResponse> Error(int statusCode, string message)
        => Response<TResponse>.ErrorResponse(statusCode, message);
}