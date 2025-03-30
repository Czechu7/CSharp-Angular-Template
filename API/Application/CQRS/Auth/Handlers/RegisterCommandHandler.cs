using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base.Commands;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.CQRS.Auth.Handlers;

public class RegisterCommandHandler : CreateCommandHandler<RegisterDto, User>
{
    protected override async Task ValidateCreateAsync(User entity, RegisterDto dto, CancellationToken cancellationToken)
    {
        bool userExists = await CurrentUserService.ExistsUserWithEmailOrUsernameAsync(
            dto.Email,
            dto.Username ?? dto.Email, 
            cancellationToken);

        if (userExists)
        {
            throw new Common.Exceptions.ApplicationException($"A user with this email or username already exists.");
        }

        await base.ValidateCreateAsync(entity, dto, cancellationToken);
    }
    protected override async Task HandleCreate(User entity, RegisterDto dto, CancellationToken cancellationToken)
    {
        entity.PasswordHash = PasswordService.HashPassword(dto.Password);
        entity.SecurityStamp = PasswordService.GenerateSecurityStamp();

        await base.HandleCreate(entity, dto, cancellationToken);
    }

}