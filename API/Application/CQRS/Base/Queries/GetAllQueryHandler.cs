using Domain.Common;
using Autofac.Extras.DynamicProxy;
using Application.Common.Interceptors;

namespace Application.CQRS.Base.Queries;

[Intercept(typeof(PropertyInjectionInterceptor))]
public class GetAllQueryHandler<TResult, TEntity> : QueryHandlerBase<GetAllQuery<TResult>, List<TResult>, TEntity>
    where TEntity : BaseEntity
{
    protected override async Task<List<TResult>> HandleQuery(GetAllQuery<TResult> request, CancellationToken cancellationToken)
    {
        var entities = await Repository.GetAllAsync(request.IncludeInactive);
        return Mapper.Map<List<TResult>>(entities);
    }
}