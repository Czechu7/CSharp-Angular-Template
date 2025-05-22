using Application.CQRS.Base.Queries;
using Application.Common.Models;
using Application.CQRS.UserPanel.DTOs;

namespace Application.CQRS.UserPanel.Queries;

public class GetUserCredentialsQuery : GetByIdQuery<UpdateUserCredentialsDto>
{
    public GetUserCredentialsQuery(Guid id) : base(id)
    {
    }
}