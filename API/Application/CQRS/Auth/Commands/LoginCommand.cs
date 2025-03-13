using Application.Common.Queries;
using Application.CQRS.Auth.DTOs;

namespace Application.CQRS.Auth.Commands;

public class LoginCommand(LoginDto loginData) : IQuery<AuthResponseDto>
{
    public LoginDto LoginData { get; set; } = loginData;
}