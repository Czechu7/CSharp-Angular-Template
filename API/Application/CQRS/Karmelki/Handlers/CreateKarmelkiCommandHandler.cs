using System;
using Application.Common.Models;
using Application.CQRS.Base.Commands;
using Application.CQRS.Karmelki.Commands;
using Application.CQRS.Karmelki.DTOs;


namespace Application.CQRS.Karmelki.Handlers;

public class CreateKarmelkiCommandHandler : CreateCommandHandler<CreateKarmelkiCommand, ResponseBase, KarmelkiDto, Domain.Entities.Karmelki>
{
    protected override Task HandleCreate(Domain.Entities.Karmelki entity, KarmelkiDto dto, CancellationToken cancellationToken)
    {
        if (!string.IsNullOrEmpty(CurrentUserService.UserId))
        {
            entity.UserId = Guid.Parse(CurrentUserService.UserId);
        }
        else
        {
            throw new InvalidOperationException("User ID is not available");
        }

        return base.HandleCreate(entity, dto, cancellationToken);
    }
}
