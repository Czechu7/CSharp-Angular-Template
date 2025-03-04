using Application.Common.Commands;
using Application.Common.Models;
using MediatR;

namespace Application.CQRS.Base.Commands;

public class CreateCommand<TDto> : ICommand<ResponseBase>, IRequest<ResponseBase>
{
    public TDto Data { get; set; }
    
    public CreateCommand(TDto data)
    {
        Data = data;
    }
}