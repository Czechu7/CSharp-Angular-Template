using Application.CQRS.Base.Queries;
using Application.CQRS.Karmelki.DTOs;

namespace Application.CQRS.Karmelki.Queries;

public class GetByIdKarmelkiQuery : GetByIdQuery<KarmelkiDto>
{
    public GetByIdKarmelkiQuery(Guid id) : base(id)
    {
    }
}