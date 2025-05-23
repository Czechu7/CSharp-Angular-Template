using System.ComponentModel.DataAnnotations;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.CQRS.UserPanel.DTOs;

public class UpdateUserCredentialsDto : IMapBidirectional<User>
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}