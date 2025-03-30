using Application.Common.Commands;
using Application.CQRS.Auth.DTOs;

namespace Application.CQRS.Auth.Commands;

public class LoginCommand(LoginDto loginData) : ICommand<AuthResponseDto>
{
    public LoginDto LoginData { get; set; } = loginData;
}