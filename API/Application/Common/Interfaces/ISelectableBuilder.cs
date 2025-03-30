using Application.Common.Models;

namespace Application.Common.Interfaces;

public interface ISelectableBuilder<TEntity>
{
    Task<List<SelectableParams>> BuildSelectableListAsync(
        string? searchTerm = null, 
        bool includeInactive = false,
        string? groupBy = null,
        int? maxResults = null,
        SelectableParams? selectParams = null);
}