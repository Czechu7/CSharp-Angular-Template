namespace Application.Common.Models;

public class SelectableParams
{
 public Guid Id { get; set; }
    public string Text { get; set; } = string.Empty;
    public string? Description { get; set; }
    public string? Group { get; set; }
    public bool IsDisabled { get; set; }
    public Dictionary<string, object>? Metadata { get; set; }
}