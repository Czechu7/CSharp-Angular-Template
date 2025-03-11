using Domain.Common;

namespace Domain.Entities;

public class RefreshToken : BaseEntity
{
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiryDate { get; set; }
    public bool IsRevoked { get; set; }
    public bool IsUsed { get; set; }
    public string? ReplacedByToken { get; set; }
    public string? RevokedReason { get; set; }
    
    public Guid UserId { get; set; }
    public User? User { get; set; }
}