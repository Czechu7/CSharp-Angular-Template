using Application.Common.Interfaces;
using Application.Common.Models;
using AutoMapper;
using Domain.Common;
using Microsoft.Extensions.Logging;
using Application.CQRS;

namespace Application.CQRS.Base.Commands;

public class CreateCommandHandler<TDto, TEntity>(
    IGenericRepository<TEntity> repository,
    IMapper mapper,
    ILogger<CreateCommandHandler<TDto, TEntity>> logger) : CommandHandlerBase<CreateCommand<TDto>>(logger)
    where TEntity : BaseEntity, new()
{
    private readonly IGenericRepository<TEntity> _repository = repository;
    private readonly IMapper _mapper = mapper;

    protected override async Task HandleCommand(CreateCommand<TDto> request, CancellationToken cancellationToken)
    {
        var entity = _mapper.Map<TEntity>(request.Data);
        await _repository.AddAsync(entity);
    }
}