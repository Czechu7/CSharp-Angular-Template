using Application.Common.Commands;

namespace Application.CQRS.Base.Commands;

public class CreateCommand<TInput, TOutput>(TInput data) : ICommand<TOutput>
{
    public TInput Data { get; set; } = data;
}