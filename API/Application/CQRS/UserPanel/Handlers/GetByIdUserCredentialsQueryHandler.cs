using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.CQRS.Base.Queries;
using Application.CQRS.Karmelki.Queries;
using Application.CQRS.UserPanel.DTOs;
using Application.CQRS.UserPanel.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.UserPanel.Handlers;

public class GetByIdUserCredentialsQueryHandler : GetByIdQueryHandler<GetByIdUserCredentialsQuery, UserCredentialsDto, Domain.Entities.User>
{
    public override async Task<Response<UserCredentialsDto>> Handle(GetByIdUserCredentialsQuery request, CancellationToken cancellationToken)
    {
        try
        {
            Logger.LogInformation("Getting Users entity with ID: {Id}", request.Id);

            var entity = await DbContext.Users
                .FirstOrDefaultAsync(k => k.Id == request.Id, cancellationToken);

            if (entity == null)
            {
                Logger.LogWarning("Users with ID {Id} not found", request.Id);
                return Error(404, $"Users with ID {request.Id} not found");
            }

            
            if (!string.IsNullOrEmpty(CurrentUserService.UserId) && 
                Guid.TryParse(CurrentUserService.UserId, out Guid userId))
            {
                if (userId != entity.Id)
                {
                    Logger.LogWarning("User {UserId} attempted to access Users {UsersId} belonging to another user", 
                        userId, entity.Id);
                    return Error(403, "You do not have permission to access this resource");
                }
            }
            else
            {
                Logger.LogWarning("Invalid or missing user ID in current user service");
                return Error(403, "You do not have permission to access this resource");
            }

            var result = Mapper.Map<UserCredentialsDto>(entity);
            
            return SuccessWithData(result, "Users retrieved successfully");
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error retrieving Users with ID {Id}", request.Id);
            return Error(500, $"Error retrieving Users: {ex.Message}");
        }
    }
}