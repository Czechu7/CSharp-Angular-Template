using Application.Common.Interfaces;
using Application.CQRS.Base.Queries;
using Application.CQRS.Users.DTOs;
using AutoMapper;
using Domain.Entities;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Users.Queries.GetUserById;

public class GetUserByIdQueryHandler : GetByIdQueryHandler<UserDto, User>
{
    public GetUserByIdQueryHandler(
        IGenericRepository<User> repository,
        IMapper mapper,
        ILogger<GetUserByIdQueryHandler> logger)
        : base(repository, mapper, logger)
    {
    }

}