using System.ComponentModel.DataAnnotations;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.CQRS.AdminPanel.DTOs;

public class UpdateUserProfileDto : IMapBidirectional<User>
{
    public string? Username { get; set; }
    public string? Roles { get; set; }
    public string? Email { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public bool? IsActive { get; set; }
}