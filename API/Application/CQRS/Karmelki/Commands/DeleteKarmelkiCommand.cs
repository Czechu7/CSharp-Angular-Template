using System;
using Application.Common.Models;
using Application.CQRS.Base.Commands;
using Application.CQRS.Karmelki.DTOs;


namespace Application.CQRS.Karmelki.Commands;

public class DeleteKarmelkiCommand(DeleteKarmelkiDto data) : DeleteCommand<ResponseBase>(id: data.Id)
{

}
