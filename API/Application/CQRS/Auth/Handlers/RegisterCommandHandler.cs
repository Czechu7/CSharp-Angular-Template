using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base.Commands;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Auth.Handlers;

public class RegisterCommandHandler : CreateCommandHandler<RegisterCommand, AuthResponseDto, RegisterDto, User>
{

    public override async Task<Response<AuthResponseDto>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var dto = request.Data;
            bool userExists = await CurrentUserService.ExistsUserWithEmailOrUsernameAsync(
                dto.Email,
                dto.Username ?? dto.Email,
                cancellationToken);

            if (userExists)
            {
                return Error(401, "User is already registered with this email or username");
            }

            var entity = Mapper.Map<User>(dto);

            entity.PasswordHash = PasswordService.HashPassword(dto.Password);
            entity.SecurityStamp = PasswordService.GenerateSecurityStamp();
            

            bool isFirstUser = !await DbContext.Users.AnyAsync(cancellationToken);
            

            if (isFirstUser)
            {
                entity.Roles = "ADMIN";
                Logger.LogInformation("First user in the system registered. Setting ADMIN role for {Username}", entity.Username);
            }
            else 
            {
                entity.Roles = "USER"; 
            }

            await Repository.AddAsync(entity);
            await DbContext.SaveChangesAsync(cancellationToken);

            var user = entity;

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

            var authResponse = new AuthResponseDto
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                ExpiresAt = TokenService.GetRefreshTokenExpiration()
            };

            return SuccessWithData(authResponse, "User registered successfully");
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error during registration process");
            return Error(500, "An error occurred during registration process");
        }
    }
}