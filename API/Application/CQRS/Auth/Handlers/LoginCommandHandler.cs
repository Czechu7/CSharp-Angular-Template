using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.CQRS.Auth.Handlers;

public class LoginCommandHandler : IRequestHandler<LoginCommand, Response<AuthResponseDto>>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly IPasswordService _passwordService;
    private readonly ITokenService _tokenService;
    private readonly ILogger<LoginCommandHandler> _logger;
    private readonly ICurrentUserService _currentUserService;

    public LoginCommandHandler(
        IApplicationDbContext dbContext,
        IPasswordService passwordService,
        ITokenService tokenService,
        ILogger<LoginCommandHandler> logger,
        ICurrentUserService currentUserService)
    {
        _dbContext = dbContext;
        _passwordService = passwordService;
        _tokenService = tokenService;
        _logger = logger;
        _currentUserService = currentUserService;
    }

    public async Task<Response<AuthResponseDto>> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var user = await _dbContext.Users
                .FirstOrDefaultAsync(u => u.Email.ToLower() == request.LoginData.Email.ToLower() && u.IsActive,
                    cancellationToken);

            if (user == null)
            {
                return Response<AuthResponseDto>.ErrorResponse(401, "Invalid credentials");
            }

            if (string.IsNullOrEmpty(user.PasswordHash))
            {
                _logger.LogWarning("User {UserId} has null or empty password hash", user.Id);
                return Response<AuthResponseDto>.ErrorResponse(401, "Invalid credentials");
            }

            if (!_passwordService.VerifyPassword(request.LoginData.Password, user.PasswordHash))
            {
                return Response<AuthResponseDto>.ErrorResponse(401, "Invalid credentials");
            }
            var accessToken = _tokenService.GenerateAccessToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            var refreshTokenEntity = new RefreshToken
            {
                UserId = user.Id,
                Token = refreshToken,
                ExpiryDate = _tokenService.GetRefreshTokenExpiration(),
                IsRevoked = false,
                IsUsed = false
            };

            await _dbContext.RefreshTokens.AddAsync(refreshTokenEntity, cancellationToken);
            await _dbContext.SaveChangesAsync(cancellationToken);

            var response = new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = _tokenService.GetAccessTokenExpiration(),
                UserId = user.Id,
                Username = user.Username,
                Email = user.Email
            };

            return Response<AuthResponseDto>.SuccessWithData(response, "Login successful");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error during login");
            return Response<AuthResponseDto>.ErrorResponse(500, "An error occurred during login");
        }
    }
}