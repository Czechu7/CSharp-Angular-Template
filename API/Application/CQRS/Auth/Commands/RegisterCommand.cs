using Application.Common.Commands;
using Application.Common.Models;
using Application.CQRS.Auth.DTOs;

namespace Application.CQRS.Auth.Commands;

public class RegisterCommand(RegisterDto registerData) : ICommand<ResponseBase>
{
    public RegisterDto RegisterData { get; set; } = registerData;
}