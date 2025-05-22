using Application.CQRS.AdminPanel.DTOs;
using Application.CQRS.Base.Queries;

namespace Application.CQRS.AdminPanel.Queries;

public class GetUserByIdQuery : GetByIdQuery<UserProfileDto>
{
    public GetUserByIdQuery(Guid id) : base(id)
    {
    }
}