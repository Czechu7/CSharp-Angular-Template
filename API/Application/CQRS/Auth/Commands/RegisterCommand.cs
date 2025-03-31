using Application.Common.Commands;
using Application.Common.Models;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base.Commands;

namespace Application.CQRS.Auth.Commands;

public class RegisterCommand(RegisterDto data) : CreateCommand<RegisterDto, AuthResponseDto>(data)
{
}