using Application.CQRS.Base.Commands;
using Application.CQRS.Users.DTOs;


namespace Application.CQRS.Users.Commands.CreateUser;

public class CreateUserCommand(UserDto data) : CreateCommand<UserDto>(data)
{
}