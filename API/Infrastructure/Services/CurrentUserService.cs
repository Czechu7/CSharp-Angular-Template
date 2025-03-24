using Application.Common.Interfaces;
using Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;


namespace Infrastructure.Services;

public class CurrentUserService(IHttpContextAccessor httpContextAccessor, IApplicationDbContext dbContext) : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
    private readonly IApplicationDbContext _dbContext = dbContext;

    public string? UserId => _httpContextAccessor.HttpContext?.User?.Claims
        .FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;

    public bool IsAuthenticated => _httpContextAccessor.HttpContext?.User?.Identity?.IsAuthenticated ?? false;
    public async Task<User?> GetCurrentUserAsync(CancellationToken cancellationToken = default)
    {
        if (!IsAuthenticated || string.IsNullOrEmpty(UserId))
            return null;

        return await FindUserByIdAsync(UserId, true, cancellationToken);
    }

    public async Task<User?> FindUserByEmailAsync(string email, bool activeOnly = true, CancellationToken cancellationToken = default)
    {
        IQueryable<User> query = _dbContext.Users;

        if (activeOnly)
            query = query.Where(u => u.IsActive);

        return await query
            .FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower(), cancellationToken);
    }

    public async Task<User?> FindUserByIdAsync(string userId, bool activeOnly = true, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrEmpty(userId) || !Guid.TryParse(userId, out Guid userGuid))
            return null;

        IQueryable<User> query = _dbContext.Users;

        if (activeOnly)
            query = query.Where(u => u.IsActive);

        return await query
            .FirstOrDefaultAsync(u => u.Id == userGuid, cancellationToken);
    }



    public async Task<bool> ExistsUserWithEmailOrUsernameAsync(string email, string username, CancellationToken cancellationToken = default)
    {
        return await _dbContext.Users
            .AnyAsync(u => u.Email.ToLower() == email.ToLower() ||
                            u.Username.ToLower() == username.ToLower(),
                      cancellationToken);
    }
}