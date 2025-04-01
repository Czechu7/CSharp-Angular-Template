using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.CQRS.Base.Queries;
using Application.CQRS.Karmelki.DTOs;
using Application.CQRS.Karmelki.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Karmelki.Handlers;

public class GetByIdKarmelkiQueryHandler : GetByIdQueryHandler<GetByIdKarmelkiQuery, KarmelkiDto, Domain.Entities.Karmelki>
{
    public override async Task<Response<KarmelkiDto>> Handle(GetByIdKarmelkiQuery request, CancellationToken cancellationToken)
    {
        try
        {
            Logger.LogInformation("Getting Karmelki entity with ID: {Id}", request.Id);


            var entity = await DbContext.Karmelki
                .Include(k => k.User)
                .FirstOrDefaultAsync(k => k.Id == request.Id, cancellationToken);

            if (entity == null)
            {
                Logger.LogWarning("Karmelki with ID {Id} not found", request.Id);
                return Error(404, $"Karmelki with ID {request.Id} not found");
            }


            if (!string.IsNullOrEmpty(CurrentUserService.UserId) && 
                Guid.TryParse(CurrentUserService.UserId, out Guid userId) &&
                entity.UserId != userId)
            {
                Logger.LogWarning("User {UserId} attempted to access Karmelki {KarmelkiId} belonging to another user", 
                    userId, entity.Id);
                return Error(403, "You do not have permission to access this resource");
            }

            var result = Mapper.Map<KarmelkiDto>(entity);
            
            return SuccessWithData(result, "Karmelki retrieved successfully");
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error retrieving Karmelki with ID {Id}", request.Id);
            return Error(500, $"Error retrieving Karmelki: {ex.Message}");
        }
    }
}