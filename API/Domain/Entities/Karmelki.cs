using Domain.Common;

namespace Domain.Entities;

public class Karmelki : BaseEntity
{
    public string Name { get; set; } = null!;
    public int Count { get; set; }
    public float Price { get; set; }
    public bool IsZiemniak{ get; set; } = false;
    public int DateTime { get; set; }
    public Guid UserId { get; set; }
    public User? User { get; set; }
}
