using Application.Common.Commands;
using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Commands;

public class UpdateCommandHandler<TDto, TEntity> : CommandHandlerBase<UpdateCommand<TDto>>
    where TEntity : BaseEntity
{
    private readonly IGenericRepository<TEntity> _repository;
    private readonly IMapper _mapper;
    
    public UpdateCommandHandler(
        IGenericRepository<TEntity> repository,
        IMapper mapper,
        ILogger<UpdateCommandHandler<TDto, TEntity>> logger) : base(logger)
    {
        _repository = repository;
        _mapper = mapper;
    }
    
    protected override async Task HandleCommand(UpdateCommand<TDto> request, CancellationToken cancellationToken)
    {
        var entity = await _repository.GetByIdAsync(request.Id) 
            ?? throw new KeyNotFoundException($"Entity with ID {request.Id} not found");
            
        _mapper.Map(request.Data, entity);
        await _repository.UpdateAsync(entity);
    }
}