using System.ComponentModel.DataAnnotations;

namespace Application.CQRS.Auth.DTOs;

public class RefreshTokenDto
{
    [Required]
    public string RefreshToken { get; set; } = string.Empty;
}