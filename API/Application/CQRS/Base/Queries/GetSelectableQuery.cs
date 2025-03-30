using Application.Common.Models;
using Application.Common.Queries;

namespace Application.CQRS.Base.Queries;

public class GetSelectableQuery<TEntity> : IQuery<List<SelectableParams>>
{
    public string? SearchTerm { get; set; }
    public bool IncludeInactive { get; set; }
    public string? GroupBy { get; set; }
    public int? MaxResults { get; set; }
    public SelectableParams? Params { get; set; }

    public GetSelectableQuery(string? searchTerm = null, bool includeInactive = false, string? groupBy = null, int? maxResults = null, SelectableParams? selectParams = null)
    {
        SearchTerm = searchTerm;
        IncludeInactive = includeInactive;
        GroupBy = groupBy;
        MaxResults = maxResults;
        Params = selectParams;
    }
}