using Application.Common.Models;
using Application.CQRS.AdminPanel.DTOs;
using Application.CQRS.AdminPanel.Queries;
using Application.CQRS.Base.Queries;
using Domain.Entities;


namespace Application.CQRS.AdminPanel.Handlers;

public class GetUserByIdQueryHandler : GetByIdQueryHandler<GetUserByIdQuery, UserProfileDto, User>
{
    public override async Task<Response<UserProfileDto>> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
    {
        try
        {
            Logger.LogInformation("Getting user with ID: {Id}", request.Id);
            
            var response = await base.Handle(request, cancellationToken);
            
            if (!response.Success)
            {
                return response;
            }
            
            return response;
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error retrieving user with ID {UserId}", request.Id);
            return Error(500, $"Error retrieving user: {ex.Message}");
        }
    }
}