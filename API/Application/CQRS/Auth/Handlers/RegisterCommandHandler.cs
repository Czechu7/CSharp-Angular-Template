using Application.Common.Attributes;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base.Commands;
using Application.CQRS.Users.DTOs;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

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