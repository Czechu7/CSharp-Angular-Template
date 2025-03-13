using Application.Common.Interfaces;
using AutoMapper;
using Domain.Common;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Commands;

public class UpdateCommandHandler<TDto, TEntity>(
    IGenericRepository<TEntity> repository,
    IMapper mapper,
    ILogger<UpdateCommandHandler<TDto, TEntity>> logger) : CommandHandlerBase<UpdateCommand<TDto>>(logger)
    where TEntity : BaseEntity
{
    private readonly IGenericRepository<TEntity> _repository = repository;
    private readonly IMapper _mapper = mapper;

    protected override async Task HandleCommand(UpdateCommand<TDto> request, CancellationToken cancellationToken)
    {
        var entity = await _repository.GetByIdAsync(request.Id) 
            ?? throw new KeyNotFoundException($"Entity with ID {request.Id} not found");
            
        _mapper.Map(request.Data, entity);
        await _repository.UpdateAsync(entity);
    }
}