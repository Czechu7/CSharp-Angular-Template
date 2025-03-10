using System.Security.Cryptography;
using System.Text;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.DTOs;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Services;

public class AuthService : IAuthService
{
    private readonly IApplicationDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthService(IApplicationDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<Response<AuthResponseDto>> Register(RegisterDto registerDto)
    {
        // Check if email already exists
        if (await _context.Users.AnyAsync(u => u.Email == registerDto.Email))
        {
            //return Response<AuthResponseDto>.Failure("User with this email already exists");
        }

        // Create password hash
        CreatePasswordHash(registerDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

        // Create new user
        var user = new User
        {
            Username = registerDto.Username,
            Email = registerDto.Email,
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt
        };

        // Generate tokens
        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = CreateRefreshToken(user);

        // Add user and save changes
        _context.Users.Add(user);
        await _context.SaveChangesAsync(CancellationToken.None);

        // Return response
        return Response<AuthResponseDto>.SuccessResponse(new AuthResponseDto
        {
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email,
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
        });
    }

    public async Task<Response<AuthResponseDto>> Login(LoginDto loginDto)
    {
        // Find user by email
        var user = await _context.Users
            .Include(u => u.RefreshTokens)
            .FirstOrDefaultAsync(u => u.Email == loginDto.Email);

        // Check if user exists and verify password
        if (user == null || !VerifyPasswordHash(loginDto.Password, user.PasswordHash, user.PasswordSalt))
        {
           // return Response<AuthResponseDto>.Failure("Invalid email or password");
        }

        // Generate tokens
        var accessToken = _tokenService.GenerateAccessToken(user);
        var refreshToken = CreateRefreshToken(user);

        // Remove old refresh tokens
        RemoveOldRefreshTokens(user);

        // Save changes
        await _context.SaveChangesAsync(CancellationToken.None);

        // Return response
        return Response<AuthResponseDto>.SuccessResponse(new AuthResponseDto
        {
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email,
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token
        });
    }

    public async Task<Response<AuthResponseDto>> RefreshToken(RefreshTokenDto refreshTokenDto)
    {
        var user = await _context.Users
            .Include(u => u.RefreshTokens)
            .FirstOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == refreshTokenDto.RefreshToken));

        if (user == null)
        {
          //  return Response<AuthResponseDto>.ErrorResponse("Invalid refresh token");
        }

        var oldRefreshToken = user.RefreshTokens.Single(x => x.Token == refreshTokenDto.RefreshToken);

        // Check if token is valid
        if (!oldRefreshToken.IsActive)
        {
            //return Response<AuthResponseDto>.SuccessResponse("Invalid refresh token");
        }

        // Revoke the old token and generate new tokens
        oldRefreshToken.IsRevoked = true;
        oldRefreshToken.IsUsed = true;
        
        var newRefreshToken = CreateRefreshToken(user);
        oldRefreshToken.ReplacedByToken = newRefreshToken.Token;

        // Generate access token
        var accessToken = _tokenService.GenerateAccessToken(user);

        // Remove old refresh tokens
        RemoveOldRefreshTokens(user);

        // Save changes
        await _context.SaveChangesAsync(CancellationToken.None);

        // Return response
        return Response<AuthResponseDto>.SuccessResponse(new AuthResponseDto
        {
            UserId = user.Id,
            Username = user.Username,
            Email = user.Email,
            AccessToken = accessToken,
            RefreshToken = newRefreshToken.Token
        });
    }

    public async Task<bool> RevokeToken(string token)
    {
        var user = await _context.Users
            .Include(u => u.RefreshTokens)
            .SingleOrDefaultAsync(u => u.RefreshTokens.Any(t => t.Token == token));

        if (user == null)
            return false;

        var refreshToken = user.RefreshTokens.Single(x => x.Token == token);

        if (!refreshToken.IsActive)
            return false;

        refreshToken.IsRevoked = true;
        await _context.SaveChangesAsync(CancellationToken.None);

        return true;
    }

    private RefreshToken CreateRefreshToken(User user)
    {
        var newRefreshToken = new RefreshToken
        {
            Token = _tokenService.GenerateRefreshToken(),
            ExpiryDate = _tokenService.GetRefreshTokenExpiryTime(),
            UserId = user.Id
        };

        user.RefreshTokens.Add(newRefreshToken);

        return newRefreshToken;
    }

    private void RemoveOldRefreshTokens(User user)
    {
        // Keep only active tokens and a few old ones for security audit
        user.RefreshTokens.RemoveAll(x => 
            !x.IsActive && 
            x.CreatedAt <= DateTime.UtcNow.AddDays(-7));
    }

    private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
    {
        using var hmac = new HMACSHA512();
        passwordSalt = hmac.Key;
        passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
    }

    private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
    {
        using var hmac = new HMACSHA512(storedSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        
        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != storedHash[i]) return false;
        }

        return true;
    }
}

// Extension method for RefreshToken entity
public static class RefreshTokenExtensions
{
    public static bool IsActive(this RefreshToken token)
    {
        return !token.IsRevoked && !token.IsUsed && token.ExpiryDate > DateTime.UtcNow;
    }
}
