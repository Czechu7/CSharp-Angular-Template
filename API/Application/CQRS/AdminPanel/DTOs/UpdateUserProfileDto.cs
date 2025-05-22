using System.ComponentModel.DataAnnotations;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.CQRS.AdminPanel.DTOs;

public class UpdateUserProfileDto : IMapBidirectional<User>
{
    public string? Username { get; set; }
    
    [Required(ErrorMessage = "Role is required")]
    [StringLength(50, MinimumLength = 2, ErrorMessage = "Role must be between 2 and 50 characters")]
    public string? Role { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public bool? IsActive { get; set; }
}