using Application.Common.Interfaces;
using Application.Common.Models;
using Application.Common.Queries;
using AutoMapper;
using Domain.Common;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Queries;

public class GetByIdQueryHandler<TResult, TEntity> 
    : QueryHandlerBase<GetByIdQuery<TResult>, TResult, TEntity>
    where TEntity : BaseEntity
{
    public GetByIdQueryHandler(
        IGenericRepository<TEntity> repository,
        IMapper mapper,
        ILogger<GetByIdQueryHandler<TResult, TEntity>> logger) 
        : base(repository, mapper, logger)
    {
    }
    
    protected override async Task<TResult> HandleQuery(GetByIdQuery<TResult> request, CancellationToken cancellationToken)
    {
        var entity = await Repository.GetByIdAsync(request.Id) 
            ?? throw new KeyNotFoundException($"Entity with ID {request.Id} not found");
            
        return Mapper.Map<TResult>(entity);
    }
}