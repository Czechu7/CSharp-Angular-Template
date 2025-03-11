using Application.Common.Queries;
using Application.CQRS.Auth.DTOs;

namespace Application.CQRS.Auth.Commands;

public class RefreshTokenCommand : IQuery<AuthResponseDto>
{
    public RefreshTokenDto TokenData { get; set; }

    public RefreshTokenCommand(RefreshTokenDto tokenData)
    {
        TokenData = tokenData;
    }
}