using Application.Common.Commands;

namespace Application.CQRS.Base.Commands;

public class UpdateCommand<TInput, TOutput>(Guid id, TInput data) : ICommand<TOutput>
{
    public Guid Id { get; set; } = id;
    public TInput Data { get; set; } = data;
}