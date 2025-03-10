using System.Linq.Expressions;
using System.Reflection;
using System.Text.Json.Serialization;

namespace Application.Common.Models;

public class SelectableParams
{
    public string? Select { get; set; }

    [JsonIgnore]
    public List<string> Properties => string.IsNullOrEmpty(Select) 
        ? new List<string>() 
        : Select.Split(',').Select(p => p.Trim()).ToList();

    public bool IsPropertySelected(string propertyName)
    {
        return Properties.Count == 0 || Properties.Contains(propertyName);
    }
}