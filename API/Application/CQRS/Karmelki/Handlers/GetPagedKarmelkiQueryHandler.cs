using Application.Common.Models;
using Application.CQRS.Base.Queries;
using Application.CQRS.Karmelki.DTOs;
using Application.CQRS.Karmelki.Queries;
using Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Application.CQRS.Karmelki.Handlers;

public class GetPagedKarmelkiQueryHandler : GetPagedQueryHandler<GetPagedKarmelkiQuery, KarmelkiResponseDto, Domain.Entities.Karmelki>
{
    public override async Task<Response<PagedResult<KarmelkiResponseDto>>> Handle(GetPagedKarmelkiQuery request, CancellationToken cancellationToken)
    {
        try
        {
            Logger.LogInformation("Getting paged Karmelki entities: Page {Page}, Size {Size}", 
                request.PageNumber, request.PageSize);
            
            if (!string.IsNullOrEmpty(CurrentUserService.UserId) && Guid.TryParse(CurrentUserService.UserId, out Guid userId))
            {
                Expression<Func<Domain.Entities.Karmelki, bool>> userFilter = k => k.UserId == userId;
                
                if (request.Filter != null)
                {
                    var parameter = Expression.Parameter(typeof(Domain.Entities.Karmelki), "k");
                    var combinedBody = Expression.AndAlso(
                        Expression.Invoke(request.Filter, parameter),
                        Expression.Invoke(userFilter, parameter)
                    );
                    
                    request.Filter = Expression.Lambda<Func<Domain.Entities.Karmelki, bool>>(combinedBody, parameter);
                }
                else
                {
                    request.Filter = userFilter;
                }
                
                Logger.LogInformation("Filtering by user ID: {UserId}", userId);
            }
            else
            {
                Logger.LogWarning("No valid user ID available, potentially returning data for all users!");
            }
            
            return await base.Handle(request, cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error retrieving paged Karmelki entities");
            return Error(500, $"Error retrieving paged Karmelki entities: {ex.Message}");
        }
    }
}