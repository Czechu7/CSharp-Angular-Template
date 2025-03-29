using Application.Common.Commands;
using Application.Common.Models;
using MediatR;

namespace Application.CQRS.Base.Commands;

public class CreateCommand<TDto>(TDto data) : ICommand<ResponseBase>
{
    public TDto Data { get; set; } = data;
    
}