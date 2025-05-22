using Application.Common.Models;
using Application.CQRS.Base.Queries;
using Application.CQRS.AdminPanel.DTOs;
using Application.CQRS.AdminPanel.Queries;
using Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Application.CQRS.AdminPanel.Handlers;

public class GetPagedUsersQueryHandler : GetPagedQueryHandler<GetPagedUsersQuery, UserProfileDto, User>
{
    public override async Task<Response<PagedResult<UserProfileDto>>> Handle(GetPagedUsersQuery request, CancellationToken cancellationToken)
    {
        try
        {
            Logger.LogInformation("Getting paged Users entities: Page {Page}, Size {Size}", 
                request.PageNumber, request.PageSize);
            
            if (!request.IncludeInactive)
            {
                Expression<Func<User, bool>> activeFilter = u => u.IsActive;
                
                if (request.Filter != null)
                {
                    var parameter = Expression.Parameter(typeof(User), "u");
                    var combinedBody = Expression.AndAlso(
                        Expression.Invoke(request.Filter, parameter),
                        Expression.Invoke(activeFilter, parameter)
                    );
                    
                    request.Filter = Expression.Lambda<Func<User, bool>>(combinedBody, parameter);
                }
                else
                {
                    request.Filter = activeFilter;
                }
                
                Logger.LogInformation("Filtering only active users");
            }
            else
            {
                Logger.LogInformation("Including inactive users in the results");
            }

            if (!string.IsNullOrEmpty(request.SearchTerm))
            {
                var searchTerm = request.SearchTerm.ToLower();
                Expression<Func<User, bool>> searchFilter = u => 
                    u.Username.ToLower().Contains(searchTerm) || 
                    u.Email.ToLower().Contains(searchTerm) ||
                    u.FirstName.ToLower().Contains(searchTerm) ||
                    u.LastName.ToLower().Contains(searchTerm) ||
                    u.Roles.ToLower().Contains(searchTerm);
                
                if (request.Filter != null)
                {
                    var parameter = Expression.Parameter(typeof(User), "u");
                    var combinedBody = Expression.AndAlso(
                        Expression.Invoke(request.Filter, parameter),
                        Expression.Invoke(searchFilter, parameter)
                    );
                    
                    request.Filter = Expression.Lambda<Func<User, bool>>(combinedBody, parameter);
                }
                else
                {
                    request.Filter = searchFilter;
                }
            }
            
            return await base.Handle(request, cancellationToken);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error retrieving paged Users entities");
            return Error(500, $"Error retrieving paged Users: {ex.Message}");
        }
    }
}