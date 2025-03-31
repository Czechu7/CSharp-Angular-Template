using Application.Common.Models;
using Application.CQRS.Base.Queries;
using Application.CQRS.Karmelki.DTOs;
using Application.CQRS.Karmelki.Queries;
using Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Karmelki.Handlers;

public class GetPagedKarmelkiQueryHandler : GetPagedQueryHandler<GetPagedKarmelkiQuery, KarmelkiDto, Domain.Entities.Karmelki>
{
    public override async Task<Response<PagedResult<KarmelkiDto>>> Handle(GetPagedKarmelkiQuery request, CancellationToken cancellationToken)
    {
        try
        {
            Logger.LogInformation("Getting paged Karmelki entities: Page {Page}, Size {Size}", 
                request.PageNumber, request.PageSize);
            

            return await base.Handle(request, cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error retrieving paged Karmelki entities");
            return Error(500, $"Error retrieving paged Karmelki entities: {ex.Message}");
        }
    }
}