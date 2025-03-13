using Application.Common.Queries;
using Application.CQRS.Auth.DTOs;

namespace Application.CQRS.Auth.Commands;

public class RefreshTokenCommand(RefreshTokenDto tokenData) : IQuery<AuthResponseDto>
{
    public RefreshTokenDto TokenData { get; set; } = tokenData;
}