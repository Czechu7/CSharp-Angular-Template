using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Models;
using Application.CQRS.Base.Queries;
using Application.CQRS.Karmelki.DTOs;
using Application.CQRS.Karmelki.Queries;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Karmelki.Handlers;

public class GetKarmelkiQueryHandler : GetAllQueryHandler<GetKarmelkiQuery, KarmelkiDto, Domain.Entities.Karmelki>
{
    public override async Task<Response<List<KarmelkiDto>>> Handle(GetKarmelkiQuery request, CancellationToken cancellationToken)
    {
        try
        {
            Logger.LogInformation("Getting all Karmelki entities");

            var query = DbContext.Karmelki.AsQueryable();

            if (!string.IsNullOrEmpty(CurrentUserService.UserId))
            {
                try
                {
                    var userId = Guid.Parse(CurrentUserService.UserId);
                    query = query.Where(k => k.UserId == userId);
                    Logger.LogInformation($"Filtering by user ID: {userId}");
                }
                catch (FormatException ex)
                {
                    Logger.LogWarning($"Invalid user ID format: {CurrentUserService.UserId}. Error: {ex.Message}");
                }
            }
            else
            {
                Logger.LogWarning("No user ID available from CurrentUserService");
            }
            

            query = query.Include(k => k.User);
            
            if (!request.IncludeInactive)
            {

            }
            
            var entities = await query.ToListAsync(cancellationToken);
            var result = Mapper.Map<List<KarmelkiDto>>(entities);
            
            return SuccessWithData(result, $"Retrieved {result.Count} Karmelki entities");
        }
        catch (Common.Exceptions.ApplicationException ex)
        {
            Logger.LogWarning(ex, "Application error: {Message}", ex.Message);
            return Error(400, ex.Message);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error getting all Karmelki entities");
            return Error(500, $"Error retrieving Karmelki entities: {ex.Message}");
        }
    }
}