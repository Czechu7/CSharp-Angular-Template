using Application.CQRS.Auth.DTOs;
using Application.Common.Models;

namespace Application.Common.Interfaces;

public interface IAuthService
{
    Task<Response<AuthResponseDto>> Register(RegisterDto registerDto);
    Task<Response<AuthResponseDto>> Login(LoginDto loginDto);
    Task<Response<AuthResponseDto>> RefreshToken(RefreshTokenDto refreshTokenDto);
    Task<bool> RevokeToken(string token);
}