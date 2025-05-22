using Application.CQRS.Base.Queries;
using Application.CQRS.UserPanel.DTOs;

namespace Application.CQRS.UserPanel.Queries;

public class GetByIdUserCredentialsQuery : GetByIdQuery<UserCredentialsDto>
{
    public GetByIdUserCredentialsQuery(Guid id) : base(id)
    {
    }
}