using Application.Common.Queries;

namespace Application.CQRS.Base.Queries;

public class GetByIdQuery<TResult> : IQuery<TResult>
{
    public Guid Id { get; set; }
    
    public GetByIdQuery(Guid id)
    {
        Id = id;
    }
}