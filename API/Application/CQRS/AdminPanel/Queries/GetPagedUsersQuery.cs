using System.Linq.Expressions;
using Application.CQRS.Base.Queries;
using Application.CQRS.AdminPanel.DTOs;
using Domain.Entities;

namespace Application.CQRS.AdminPanel.Queries;

public class GetPagedUsersQuery : GetPagedQuery<UserProfileDto, User>
{
    public bool IncludeInactive { get; set; }

    public GetPagedUsersQuery(
        int pageNumber,
        int pageSize,
        string? searchTerm = null,
        string? sortBy = null,
        bool sortDescending = false,
        bool includeInactive = false)
        : base(pageNumber, pageSize, searchTerm)
    {
        SortBy = sortBy ?? "Username";
        SortDescending = sortDescending;
        IncludeInactive = includeInactive;
    }
}