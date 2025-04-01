using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Models;
using Application.CQRS.Base.Commands;
using Application.CQRS.Karmelki.Commands;
using Application.CQRS.Karmelki.DTOs;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Karmelki.Handlers;

public class UpdateKarmelkiCommandHandler : UpdateCommandHandler<UpdateKarmelkiCommand, ResponseBase, KarmelkiDto, Domain.Entities.Karmelki>
{
    protected override async Task ValidateUpdateAsync(Domain.Entities.Karmelki entity, KarmelkiDto dto, CancellationToken cancellationToken)
    {

        if (!string.IsNullOrEmpty(CurrentUserService.UserId) && Guid.TryParse(CurrentUserService.UserId, out Guid userId))
        {
            if (entity.UserId != userId)
            {
                Logger.LogWarning("User {UserId} attempted to update Karmelki {KarmelkiId} belonging to another user",
                    userId, entity.Id);
                throw new Common.Exceptions.ApplicationException("You do not have permission to update this Karmelki record");
            }
        }
        else
        {

            // throw new UnauthorizedException("User authentication required to update Karmelki records");
        }

        if (dto.Count < 0)
        {
            throw new Common.Exceptions.ApplicationException("Count must be greater than or equal to 0");
        }

        if (dto.Price < 0)
        {
            throw new Common.Exceptions.ApplicationException("Price must be greater than or equal to 0");
        }

        if (string.IsNullOrWhiteSpace(dto.Name))
        {
            throw new Common.Exceptions.ApplicationException("Name is required");
        }

        await base.ValidateUpdateAsync(entity, dto, cancellationToken);
    }

    protected override Task HandleUpdateAsync(Domain.Entities.Karmelki entity, KarmelkiDto dto, CancellationToken cancellationToken)
    {

        entity.UserId = entity.UserId;

        Logger.LogInformation("Updating Karmelki {Id} with name {Name}", entity.Id, dto.Name);

        return base.HandleUpdateAsync(entity, dto, cancellationToken);
    }

        protected override Task<ResponseBase> CreateResponseFromEntityAsync(Domain.Entities.Karmelki entity, KarmelkiDto dto, CancellationToken cancellationToken)
    {
        return Task.FromResult(new ResponseBase 
        { 
            StatusCode = 200, 
            Message = $"Karmelki with ID {entity.Id} updated successfully",
            Success = true
        });
    }
}