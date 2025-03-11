using Domain.Entities;

namespace Application.Common.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    (bool isValid, string userId) ValidateAccessToken(string token);
    DateTime GetAccessTokenExpiration();
    DateTime GetRefreshTokenExpiration();
}