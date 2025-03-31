using Application.CQRS.Base.Commands;
using Application.CQRS.Karmelki.DTOs;
using Application.Common.Models;

namespace Application.CQRS.Karmelki.Commands;

public class UpdateKarmelkiCommand : UpdateCommand<KarmelkiDto, ResponseBase>
{
    public UpdateKarmelkiCommand(Guid id, KarmelkiDto data) : base(id, data)
    {
    }
}