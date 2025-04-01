using Application.CQRS.Base.Queries;
using Application.CQRS.Karmelki.DTOs;
using Application.Common.Models;

namespace Application.CQRS.Karmelki.Queries;

public class GetKarmelkiQuery : GetAllQuery<KarmelkiDto>
{
    public GetKarmelkiQuery(bool includeInactive = false) : base(includeInactive)
    {
    }
}