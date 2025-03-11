using Application.Common.Queries;
using Application.CQRS.Auth.DTOs;

namespace Application.CQRS.Auth.Commands;

public class LoginCommand : IQuery<AuthResponseDto>
{
    public LoginDto LoginData { get; set; }

    public LoginCommand(LoginDto loginData)
    {
        LoginData = loginData;
    }
}