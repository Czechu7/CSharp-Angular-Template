using Application.Common.Attributes;
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
public class GetAllQueryHandler<TCommand, TResult, TEntity> : IRequestHandler<TCommand, Response<List<TResult>>>
    where TCommand : IRequest<Response<List<TResult>>>
    where TEntity : BaseEntity
{
    [Inject] protected IGenericRepository<TEntity> Repository { get; set; } = null!;
    [Inject] protected IMapper Mapper { get; set; } = null!;
    [Inject] protected ILogger<GetAllQueryHandler<TCommand, TResult, TEntity>> Logger { get; set; } = null!;
    [Inject] protected IApplicationDbContext DbContext { get; set; } = null!;
    [Inject] protected ICurrentUserService CurrentUserService { get; set; } = null!;

    public virtual async Task<Response<List<TResult>>> Handle(TCommand request, CancellationToken cancellationToken)
    {
        try
        {
            bool includeInactive = false;
            try
            {
                includeInactive = ((dynamic)request).IncludeInactive;
            }
            catch
            {
            }

            Logger.LogInformation("Getting all {EntityType} entities", typeof(TEntity).Name);
            
            var entities = await Repository.GetAllAsync(includeInactive);
            var result = Mapper.Map<List<TResult>>(entities);
            
            return SuccessWithData(result, $"Retrieved {result.Count} {typeof(TEntity).Name} entities");
        }
        catch (Common.Exceptions.ApplicationException ex)
        {
            Logger.LogWarning(ex, "Application error: {Message}", ex.Message);
            return Error(400, ex.Message);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error getting all {EntityType} entities", typeof(TEntity).Name);
            return Error(500, $"Error retrieving {typeof(TEntity).Name} entities: {ex.Message}");
        }
    }

    protected Response<List<TResult>> SuccessWithData(List<TResult> data, string message = "Operation successful")
        => Response<List<TResult>>.SuccessWithData(data, message);

    protected Response<List<TResult>> Error(int statusCode, string message)
        => Response<List<TResult>>.ErrorResponse(statusCode, message);
}