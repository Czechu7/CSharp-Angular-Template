using Application.Common.Commands;
using Application.Common.Models;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base.Commands;
using Application.CQRS.Users.DTOs;

namespace Application.CQRS.Auth.Commands;

public class RegisterCommand(RegisterDto data) : CreateCommand<RegisterDto>(data)
{
}