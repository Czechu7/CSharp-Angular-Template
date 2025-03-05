using Application.Common.Queries;

namespace Application.CQRS.Base.Queries;

public class GetByIdQuery<TResult>(Guid id) : IQuery<TResult>
{
    public Guid Id { get; set; } = id;
}