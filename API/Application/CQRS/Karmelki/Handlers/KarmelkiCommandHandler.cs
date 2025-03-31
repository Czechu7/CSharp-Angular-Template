using System;
using Application.Common.Models;
using Application.CQRS.Base.Commands;
using Application.CQRS.Karmelki.Commands;
using Application.CQRS.Karmelki.DTOs;


namespace Application.CQRS.Karmelki.Handlers;

public class KarmelkiCommandHandler : CreateCommandHandler<CreateKarmelkiCommand, ResponseBase, KarmelkiDto, Domain.Entities.Karmelki>
{

}
