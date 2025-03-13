using Application.Common.Models;
using Application.CQRS.Auth.DTOs;
using MediatR;

namespace Application.CQRS.Auth.Commands;

public class RevokeTokenCommand : IRequest<ResponseBase>
{
    public string RefreshToken { get; }

    public RevokeTokenCommand(RevokeTokenDto tokenData)
    {
        RefreshToken = tokenData.RefreshToken;
    }
}