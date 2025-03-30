using Domain.Common;

namespace Domain.Entities;

public class Example : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Age { get; set; }
    public DateTime DateOfBirth { get; set; }
    public bool IsChanged { get; set; } = false;

}
