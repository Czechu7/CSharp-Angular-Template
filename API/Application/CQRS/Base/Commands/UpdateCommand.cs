using Application.Common.Commands;
using Application.Common.Models;

namespace Application.CQRS.Base.Commands;

public class UpdateCommand<TDto> : ICommand<ResponseBase>
{
    public Guid Id { get; set; }
    public TDto Data { get; set; }
    
    public UpdateCommand(Guid id, TDto data)
    {
        Id = id;
        Data = data;
    }
}