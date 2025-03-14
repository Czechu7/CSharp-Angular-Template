using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Auth.Handlers;

public class RefreshTokenCommandHandler(
    IApplicationDbContext dbContext,
    ITokenService tokenService,
    ILogger<RefreshTokenCommandHandler> logger) : IRequestHandler<RefreshTokenCommand, Response<AuthResponseDto>>
{
    private readonly IApplicationDbContext _dbContext = dbContext;
    private readonly ITokenService _tokenService = tokenService;
    private readonly ILogger<RefreshTokenCommandHandler> _logger = logger;

    public async Task<Response<AuthResponseDto>> Handle(RefreshTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            _logger.LogInformation("Processing refresh token request");
            
            var refreshToken = await _dbContext.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == request.TokenData.RefreshToken, cancellationToken);

            if (refreshToken == null)
            {
                _logger.LogWarning("Refresh token not found: {Token}", request.TokenData.RefreshToken);
                return Response<AuthResponseDto>.ErrorResponse(401, "Invalid refresh token");
            }

            _logger.LogInformation("Found refresh token for user: {UserId}", refreshToken.UserId);

            if (refreshToken.IsUsed)
            {
                _logger.LogWarning("Attempt to use already used refresh token: {Token}", request.TokenData.RefreshToken);
                return Response<AuthResponseDto>.ErrorResponse(401, "Refresh token has been used");
            }

            if (refreshToken.IsRevoked)
            {
                _logger.LogWarning("Attempt to use revoked refresh token: {Token}", request.TokenData.RefreshToken);
                return Response<AuthResponseDto>.ErrorResponse(401, "Refresh token has been revoked");
            }

            if (refreshToken.ExpiryDate < DateTime.UtcNow)
            {
                refreshToken.IsRevoked = true;
                refreshToken.RevokedReason = "Token expired";
                await _dbContext.SaveChangesAsync(cancellationToken);
                
                _logger.LogWarning("Attempt to use expired refresh token: {Token}", request.TokenData.RefreshToken);
                return Response<AuthResponseDto>.ErrorResponse(401, "Refresh token expired");
            }

            var user = refreshToken.User;
            
            if (user == null || !user.IsActive)
            {
                _logger.LogWarning("User not found or inactive for refresh token: {Token}", request.TokenData.RefreshToken);
                return Response<AuthResponseDto>.ErrorResponse(401, "User not found or inactive");
            }

            refreshToken.IsUsed = true;
            var newRefreshToken = _tokenService.GenerateRefreshToken();
            refreshToken.ReplacedByToken = newRefreshToken;
            _dbContext.RefreshTokens.Update(refreshToken);

            var accessToken = _tokenService.GenerateAccessToken(user);

            var newRefreshTokenEntity = new RefreshToken
            {
                UserId = user.Id,
                Token = newRefreshToken,
                ExpiryDate = _tokenService.GetRefreshTokenExpiration(),
                IsRevoked = false,
                IsUsed = false
            };

            await _dbContext.RefreshTokens.AddAsync(newRefreshTokenEntity, cancellationToken);
            
            var thirtyDaysAgo = DateTime.UtcNow.AddDays(-30);
            var tokensToDelete = await _dbContext.RefreshTokens
                .Where(t => t.UserId == user.Id && 
                       t.ExpiryDate < thirtyDaysAgo && 
                       t.IsUsed)
                .ToListAsync(cancellationToken);
                
            if (tokensToDelete.Any())
            {
                _dbContext.RefreshTokens.RemoveRange(tokensToDelete);
                _logger.LogInformation("Deleted {Count} expired tokens for user {UserId}", tokensToDelete.Count, user.Id);
            }
            
            await _dbContext.SaveChangesAsync(cancellationToken);

            var response = new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = newRefreshToken,
                ExpiresAt = _tokenService.GetRefreshTokenExpiration(),
            };

            _logger.LogInformation("Successfully refreshed token for user {UserId}", user.Id);
            return Response<AuthResponseDto>.SuccessWithData(response, "Token refreshed");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error refreshing token");
            return Response<AuthResponseDto>.ErrorResponse(500, "An error occurred during token refresh");
        }
    }
}