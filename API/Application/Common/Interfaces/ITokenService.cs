using Domain.Entities;

namespace Application.Common.Interfaces;

public interface ITokenService
{
    string GenerateAccessToken(User user);
    string GenerateRefreshToken();
    (string userId, DateTime expiryDate) ValidateAccessToken(string token);
    DateTime GetRefreshTokenExpiryTime();
}