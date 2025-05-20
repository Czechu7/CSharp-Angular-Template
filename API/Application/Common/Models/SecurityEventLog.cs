namespace Application.Common.Models;

public class SecurityEventLog
{
    public Guid Id { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string IpAddress { get; set; } = string.Empty;  
    public string Action { get; set; } = string.Empty;
    public string Resource { get; set; } = string.Empty;
    public string ResourceId { get; set; } = string.Empty;
    public string Result { get; set; } = string.Empty;
    public int StatusCode { get; set; }
    public string? Message { get; set; }
    public string? AdditionalData { get; set; }
}