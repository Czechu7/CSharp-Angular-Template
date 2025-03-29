using Domain.Entities;

namespace Application.Common.Interfaces;

public interface ICurrentUserService
{
    string? UserId { get; }
    bool IsAuthenticated { get; }
    Task<User?> GetCurrentUserAsync(CancellationToken cancellationToken = default);
    Task<User?> FindUserByEmailAsync(string email, bool activeOnly = true, CancellationToken cancellationToken = default);
    Task<User?> FindUserByIdAsync(string userId, bool activeOnly = true, CancellationToken cancellationToken = default);
    Task<bool> ExistsUserWithEmailOrUsernameAsync(string email, string username, CancellationToken cancellationToken = default);

}