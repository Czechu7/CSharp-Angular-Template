using Application.Common.Interfaces;
using Application.CQRS.Base.Commands;
using Application.CQRS.Users.DTOs;
using AutoMapper;
using Domain.Entities;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Users.Commands.CreateUser;

public class CreateUserCommandHandler(
    IGenericRepository<User> repository,
    IMapper mapper,
    ILogger<CreateUserCommandHandler> logger) : CreateCommandHandler<UserDto, User>(repository, mapper, logger)
{
}