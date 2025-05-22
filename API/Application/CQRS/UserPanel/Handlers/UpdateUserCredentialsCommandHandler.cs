using Application.Common.Models;
using Application.CQRS.Base.Commands;
using Application.CQRS.UserPanel.Commands;
using Application.CQRS.UserPanel.DTOs;
using Domain.Entities;

namespace Application.CQRS.UserPanel.Handlers;

public class UpdateUserCredentialsCommandHandler : UpdateCommandHandler<UpdateUserCredentialsCommand, ResponseBase, UpdateUserCredentialsDto, User>
{
}