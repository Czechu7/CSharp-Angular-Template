using Application.Common.Commands;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Common;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base.Commands;

public class DeleteCommandHandler<TEntity>(
    IGenericRepository<TEntity> repository,
    ILogger<DeleteCommandHandler<TEntity>> logger) : CommandHandlerBase<DeleteCommand>(logger)
    where TEntity : BaseEntity
{
    private readonly IGenericRepository<TEntity> _repository = repository;

    protected override async Task HandleCommand(DeleteCommand request, CancellationToken cancellationToken)
    {
        if (!await _repository.ExistsAsync(request.Id))
            throw new KeyNotFoundException($"Entity with ID {request.Id} not found");
            
        await _repository.DeleteAsync(request.Id);
    }
}