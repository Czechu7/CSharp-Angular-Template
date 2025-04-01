using System;
using Application.Common.Models;
using Application.CQRS.Base.Commands;
using Application.CQRS.Karmelki.DTOs;

namespace Application.CQRS.Karmelki.Commands;

public class CreateKarmelkiCommand(KarmelkiDto data) : CreateCommand<KarmelkiDto, ResponseBase>(data)
{

}
