using Application.Common.Commands;
using Application.Common.Models;
using Application.CQRS.AdminPanel.DTOs;
using Application.CQRS.Base.Commands;

namespace Application.CQRS.AdminPanel.Commands;

public class UpdateUserProfileCommand : UpdateCommand<UpdateUserProfileDto, UserProfileDto>
{
    public UpdateUserProfileCommand(Guid id, UpdateUserProfileDto data) : base(id, data)
    {
    }
}