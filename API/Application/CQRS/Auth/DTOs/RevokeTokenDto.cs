using System.ComponentModel.DataAnnotations;

namespace Application.CQRS.Auth.DTOs;

public class RevokeTokenDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}