using Application.Common.Queries;

namespace Application.CQRS.Base.Queries;

public class GetAllQuery<TResult>(bool includeInactive = false) : IQuery<List<TResult>>
{
    public bool IncludeInactive { get; set; } = includeInactive;
}