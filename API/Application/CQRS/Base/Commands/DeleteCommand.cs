using Application.Common.Commands;
using Application.Common.Models;

namespace Application.CQRS.Base.Commands;

public class DeleteCommand : ICommand<ResponseBase>
{
    public Guid Id { get; set; }
    
    public DeleteCommand(Guid id)
    {
        Id = id;
    }
}