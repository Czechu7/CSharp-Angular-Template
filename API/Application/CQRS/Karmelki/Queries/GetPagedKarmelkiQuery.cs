using System.Linq.Expressions;
using Application.CQRS.Base.Queries;
using Application.CQRS.Karmelki.DTOs;
using Domain.Entities;

namespace Application.CQRS.Karmelki.Queries;

public class GetPagedKarmelkiQuery : GetPagedQuery<KarmelkiResponseDto, Domain.Entities.Karmelki>
{
    public GetPagedKarmelkiQuery(
        int pageNumber, 
        int pageSize, 
        string? searchTerm = null,
        string? sortBy = null,
        bool sortDescending = false) 
        : base(pageNumber, pageSize, searchTerm)
    {
        SortBy = sortBy ?? "Name";
        SortDescending = sortDescending;
    }
}