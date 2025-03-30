using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base.Commands;
using Domain.Entities;

namespace Application.CQRS.Auth.Handlers;

public class RegisterCommandHandler : CreateCommandHandler<RegisterDto, User>
{
    protected override async Task HandleCreate(User entity, RegisterDto dto, CancellationToken cancellationToken)
    {
        entity.PasswordHash = PasswordService.HashPassword(dto.Password);
        entity.SecurityStamp = PasswordService.GenerateSecurityStamp();

        await base.HandleCreate(entity, dto, cancellationToken);
    }
  
}