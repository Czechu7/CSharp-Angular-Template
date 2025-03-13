using Application.Common.Commands;
using Application.Common.Models;
using Application.CQRS.Auth.DTOs;

namespace Application.CQRS.Auth.Commands;

public class RevokeTokenCommand(RevokeTokenDto revokeToken) : ICommand<ResponseBase>
{
    public RevokeTokenDto RevokeToken { get; set; } = revokeToken;
}