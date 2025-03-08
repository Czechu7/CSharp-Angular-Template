using Application.CQRS.Base.Queries;
using Application.CQRS.Users.DTOs;

namespace Application.CQRS.Users.Queries.GetUserById;

public class GetUserByIdQuery(Guid id) : GetByIdQuery<UserDto>(id)
{
}