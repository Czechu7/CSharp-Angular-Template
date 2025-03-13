using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Auth.Handlers;

public class RevokeTokenCommandHandler : IRequestHandler<RevokeTokenCommand, ResponseBase>
{
    private readonly IApplicationDbContext _dbContext;
    private readonly ILogger<RevokeTokenCommandHandler> _logger;

    public RevokeTokenCommandHandler(IApplicationDbContext dbContext, ILogger<RevokeTokenCommandHandler> logger)
    {
        _dbContext = dbContext;
        _logger = logger;
    }

    public async Task<ResponseBase> Handle(RevokeTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var refreshToken = await _dbContext.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == request.RevokeToken.RefreshToken, cancellationToken);

            if (refreshToken == null)
            {
                _logger.LogWarning("Attempt to revoke non-existent token");
                return ResponseBase.ErrorResponse(400, "Invalid token");
            }

            if (refreshToken.IsRevoked)
            {
                return ResponseBase.ErrorResponse(400, "Token is already revoked");
            }

            refreshToken.IsRevoked = true;
            refreshToken.RevokedReason = "Revoked by user";
            refreshToken.IsUsed = true;
            
            await _dbContext.SaveChangesAsync(cancellationToken);
            
            _logger.LogInformation("Token revoked successfully for user {UserId}", refreshToken.UserId);
            return ResponseBase.SuccessResponse("Token revoked successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error revoking token");
            return ResponseBase.ErrorResponse(500, "An error occurred while revoking the token");
        }
    }
}