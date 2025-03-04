using Application.Common.Queries;

namespace Application.CQRS.Base.Queries;

public class GetAllQuery<TResult> : IQuery<List<TResult>>
{
    public bool IncludeInactive { get; set; }
    
    public GetAllQuery(bool includeInactive = false)
    {
        IncludeInactive = includeInactive;
    }
}