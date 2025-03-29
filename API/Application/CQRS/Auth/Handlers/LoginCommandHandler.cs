using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Auth.Handlers;


public class LoginCommandHandler : BaseCommandHandler<LoginCommand, AuthResponseDto>
{
    public override async Task<Response<AuthResponseDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = await DbContext.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == request.LoginData.Email.ToLower() && u.IsActive,
                    cancellationToken);

            if (user == null)
            {
                return Error(401, "Invalid credentials");
            }

            if (string.IsNullOrEmpty(user.PasswordHash))
            {
                Logger.LogWarning("User {UserId} has null or empty password hash", user.Id);
                return Error(401, "Invalid credentials");
            }

            if (!PasswordService.VerifyPassword(request.LoginData.Password, user.PasswordHash))
            {
                return Error(401, "Invalid credentials");
            }
            
            if (TokenService == null)
                return Error(500, "Token service is not available");

            var accessToken = TokenService.GenerateAccessToken(user);
            var refreshToken = TokenService.GenerateRefreshToken();

            var refreshTokenEntity = new RefreshToken
            {
                UserId = user.Id,
                Token = refreshToken!,
                ExpiryDate = TokenService.GetRefreshTokenExpiration(),
                IsRevoked = false,
                IsUsed = false
            };

            await DbContext.RefreshTokens.AddAsync(refreshTokenEntity, cancellationToken);
            await DbContext.SaveChangesAsync(cancellationToken);

            var response = new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = TokenService.GetRefreshTokenExpiration(),
            };

            return SuccessWithData(response, "Login successful");
        }
        catch (Exception ex)
        {
            Logger?.LogError(ex, "Error during login");
            return Error(500, "An error occurred during login");
        }
    }
}