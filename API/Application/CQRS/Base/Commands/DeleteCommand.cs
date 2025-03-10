using Application.Common.Commands;
using Application.Common.Models;

namespace Application.CQRS.Base.Commands;

public class DeleteCommand(Guid id) : ICommand<ResponseBase>
{
    public Guid Id { get; set; } = id;
}