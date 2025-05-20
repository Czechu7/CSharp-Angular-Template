namespace Application.Common.Models;

public class ApplicationErrorLog
{
    public Guid Id { get; set; }
    public DateTimeOffset Timestamp { get; set; }
    public string UserId { get; set; } = string.Empty;
    public string Context { get; set; } = string.Empty;
    public string ExceptionType { get; set; } = string.Empty;
    public string ExceptionMessage { get; set; } = string.Empty;
    public string? StackTrace { get; set; }
}