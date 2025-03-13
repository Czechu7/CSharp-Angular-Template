using System.Security.Cryptography;
using Application.Common.Interfaces;

namespace Infrastructure.Services;

public class PasswordService : IPasswordService
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyPassword(string password, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, passwordHash);
    }

    public string GenerateSecurityStamp()
    {
        return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
    }
}