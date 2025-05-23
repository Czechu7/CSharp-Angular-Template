using Application.Common.Commands;
using Application.Common.Models;
using Application.CQRS.Base.Commands;
using Application.CQRS.UserPanel.DTOs;

namespace Application.CQRS.UserPanel.Commands;

public class UpdateUserCredentialsCommand(Guid id, UpdateUserCredentialsDto data) : UpdateCommand<UpdateUserCredentialsDto, ResponseBase>(id, data)
{
}