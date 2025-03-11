using Application.Common.Commands;
using Application.Common.Models;
using Application.CQRS.Auth.DTOs;

namespace Application.CQRS.Auth.Commands;

public class RegisterCommand : ICommand<ResponseBase>
{
    public RegisterDto RegisterData { get; set; }

    public RegisterCommand(RegisterDto registerData)
    {
        RegisterData = registerData;
    }
}