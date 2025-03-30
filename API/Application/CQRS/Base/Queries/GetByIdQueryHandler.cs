using Domain.Common;
using Autofac.Extras.DynamicProxy;
using Application.Common.Interceptors;

namespace Application.CQRS.Base.Queries;

[Intercept(typeof(PropertyInjectionInterceptor))]
public class GetByIdQueryHandler<TResult, TEntity> : QueryHandlerBase<GetByIdQuery<TResult>, TResult, TEntity>
    where TEntity : BaseEntity
{
    protected override async Task<TResult> HandleQuery(GetByIdQuery<TResult> request, CancellationToken cancellationToken)
    {
        var entity = await Repository.GetByIdAsync(request.Id);
        
        if (entity == null)
        {
            throw new KeyNotFoundException($"Entity with ID {request.Id} not found");
        }
            
        return Mapper.Map<TResult>(entity);
    }
}