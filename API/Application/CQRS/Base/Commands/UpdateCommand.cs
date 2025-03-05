using Application.Common.Commands;
using Application.Common.Models;

namespace Application.CQRS.Base.Commands;

public class UpdateCommand<TDto>(Guid id, TDto data) : ICommand<ResponseBase>
{
    public Guid Id { get; set; } = id;
    public TDto Data { get; set; } = data;
}