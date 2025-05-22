using System.ComponentModel.DataAnnotations;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.CQRS.AdminPanel.DTOs;

public class UserProfileDto : IMapFrom<User>
{
    public Guid Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Roles { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public bool IsActive { get; set; } = true;
    public DateTime? ModifiedAt { get; set; }
    public string? ModifiedBy { get; set; }
}