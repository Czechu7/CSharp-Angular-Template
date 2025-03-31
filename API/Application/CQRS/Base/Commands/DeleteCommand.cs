using Application.Common.Commands;
using Application.Common.Models;

namespace Application.CQRS.Base.Commands;

public class DeleteCommand<TOutput>(Guid id) : ICommand<TOutput>
{
    public Guid Id { get; set; } = id;
}