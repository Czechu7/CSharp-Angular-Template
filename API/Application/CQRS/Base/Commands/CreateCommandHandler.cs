using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Common;
using Microsoft.Extensions.Logging;
using Application.CQRS;

namespace Application.CQRS.Base.Commands;

public class CreateCommandHandler<TDto, TEntity> : CommandHandlerBase<CreateCommand<TDto>>
    where TEntity : BaseEntity, new()
{
    private readonly IGenericRepository<TEntity> _repository;
    private readonly IMapper _mapper;
    
    public CreateCommandHandler(
        IGenericRepository<TEntity> repository,
        IMapper mapper,
        ILogger<CreateCommandHandler<TDto, TEntity>> logger) : base(logger)
    {
        _repository = repository;
        _mapper = mapper;
    }
    
    protected override async Task HandleCommand(CreateCommand<TDto> request, CancellationToken cancellationToken)
    {
        var entity = _mapper.Map<TEntity>(request.Data);
        await _repository.AddAsync(entity);
    }
}