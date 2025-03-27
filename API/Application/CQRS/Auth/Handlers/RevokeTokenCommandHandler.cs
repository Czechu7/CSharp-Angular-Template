using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base;
using MediatR;
using Microsoft.EntityFrameworkCore;


namespace Application.CQRS.Auth.Handlers;

public class RevokeTokenCommandHandler : BaseCommandHandler<RevokeTokenCommand, ResponseBase>
{


    public override async Task<Response<ResponseBase>> Handle(RevokeTokenCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var refreshToken = await DbContext.RefreshTokens
                .Include(rt => rt.User)
                .FirstOrDefaultAsync(rt => rt.Token == request.RevokeToken.RefreshToken, cancellationToken);

            if (refreshToken == null)
            {
                Logger.LogWarning("Attempt to revoke non-existent token");
                return (Response<ResponseBase>)ResponseBase.ErrorResponse(400, "Invalid token");
            }

            if (refreshToken.IsRevoked)
            {
                return (Response<ResponseBase>)ResponseBase.ErrorResponse(400, "Token is already revoked");
            }

            refreshToken.IsRevoked = true;
            refreshToken.RevokedReason = "Revoked by user";
            refreshToken.IsUsed = true;

            await DbContext.SaveChangesAsync(cancellationToken);

            Logger.LogInformation("Token revoked successfully for user {UserId}", refreshToken.UserId);
            return Success("Token revoked successfully");
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error revoking token");
            return (Response<ResponseBase>)ResponseBase.ErrorResponse(500, "An error occurred while revoking the token");
        }
    }
}