using Application.Common.Attributes;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.AdminPanel.Commands;
using Application.CQRS.AdminPanel.DTOs;
using Application.CQRS.Base.Commands;
using Autofac.Extras.DynamicProxy;
using Domain.Entities;
using FluentValidation.Results;
using MediatR;
using Microsoft.Extensions.Logging;
using Application.Common.Exceptions;

namespace Application.CQRS.AdminPanel.Handlers;


public class UpdateUserProfileCommandHandler : UpdateCommandHandler<UpdateUserProfileCommand, UserProfileDto, UpdateUserProfileDto, User>
{
    public override async Task<Response<UserProfileDto>> Handle(UpdateUserProfileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var id = request.Id;
            var dto = request.Data;

            var entity = await Repository.GetByIdAsync(id) ?? 
                throw new NotFoundException(typeof(User).Name, id);
            
            await ValidateUpdateAsync(entity, dto, cancellationToken);
            
            await HandleUpdateAsync(entity, dto, cancellationToken);
            
            await Repository.UpdateAsync(entity);
            
            var response = await CreateResponseFromEntityAsync(entity, dto, cancellationToken);
            
            return Response<UserProfileDto>.SuccessWithData(response, $"{typeof(User).Name} updated successfully");
        }
        catch (NotFoundException ex)
        {
            Logger.LogWarning(ex, "Entity not found: {Message}", ex.Message);
            return Response<UserProfileDto>.ErrorResponse(404, ex.Message);
        }
        catch (ValidationException ex)
        {
            Logger.LogWarning(ex, "Validation failed: {Errors}", 
                string.Join(", ", ex.Errors.Select(e => $"{e.Key}: {string.Join(", ", e.Value)}")));
            
            return Response<UserProfileDto>.ErrorResponse(400, "Validation failed", 
                ex.Errors.SelectMany(e => e.Value.Select(v => $"{e.Key}: {v}")).ToList());
        }
        catch (Common.Exceptions.ApplicationException ex)
        {
            Logger.LogWarning(ex, "Application error: {Message}", ex.Message);
            return Response<UserProfileDto>.ErrorResponse(400, ex.Message);
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error updating {EntityType} with ID {EntityId}", typeof(User).Name, request.Id);
            return Response<UserProfileDto>.ErrorResponse(500, $"Error updating {typeof(User).Name}: {ex.Message}");
        }
    }

    protected override Task ValidateUpdateAsync(User entity, UpdateUserProfileDto dto, CancellationToken cancellationToken)
    {
        var validationFailures = new List<ValidationFailure>();

        if (!string.IsNullOrEmpty(dto.Roles))
        {
            var validRoles = new[] { "ADMIN", "USER", "MODERATOR" }; 
            
            var rolesToAssign = dto.Roles.Split(',')
                .Select(r => r.Trim().ToUpper())
                .Where(r => !string.IsNullOrEmpty(r))
                .ToList();
                
            if (!rolesToAssign.Any())
            {
                validationFailures.Add(new ValidationFailure("Role", "At least one valid role must be specified"));
            }
            
            foreach (var role in rolesToAssign)
            {
                if (!validRoles.Contains(role))
                {
                    validationFailures.Add(new ValidationFailure("Role", 
                        $"Invalid role '{role}'. Valid roles are: {string.Join(", ", validRoles)}"));
                }
            }
        }

        if (!string.IsNullOrEmpty(dto.Email) && !IsValidEmail(dto.Email))
        {
            validationFailures.Add(new ValidationFailure("Email", "Invalid email format"));
        }

        if (!string.IsNullOrEmpty(dto.Username) && dto.Username.Length < 3)
        {
            validationFailures.Add(new ValidationFailure("Username", "Username must be at least 3 characters long"));
        }

        if (validationFailures.Any())
        {
            throw new Common.Exceptions.ValidationException(validationFailures);
        }

        return Task.CompletedTask;
    }

    protected override Task HandleUpdateAsync(User entity, UpdateUserProfileDto dto, CancellationToken cancellationToken)
    {
        var previousRoles = entity.Roles;
        var previousUsername = entity.Username;
        var previousEmail = entity.Email;
        var previousStatus = entity.IsActive;


        if (!string.IsNullOrEmpty(dto.Username))
            entity.Username = dto.Username;
            
        if (!string.IsNullOrEmpty(dto.Email))
            entity.Email = dto.Email;
            
        if (!string.IsNullOrEmpty(dto.FirstName))
            entity.FirstName = dto.FirstName;
            
        if (!string.IsNullOrEmpty(dto.LastName))
            entity.LastName = dto.LastName;
            
        if (!string.IsNullOrEmpty(dto.Roles))
        {
            var rolesToAssign = dto.Roles
                .Split(',')
                .Select(r => r.Trim().ToUpper())
                .Where(r => !string.IsNullOrEmpty(r))
                .Distinct() 
                .ToList();
                
            entity.Roles = string.Join(",", rolesToAssign);
            
            Logger.LogInformation(
                "User roles changed: User ID: {UserId}, UserName: {UserName}, Previous Roles: {PreviousRoles}, New Roles: {NewRoles}, Changed by: {AdminId}",
                entity.Id, entity.Username, previousRoles, entity.Roles, CurrentUserService.UserId);
        }
        
        if (dto.IsActive.HasValue && dto.IsActive.Value != entity.IsActive)
        {
            entity.IsActive = dto.IsActive.Value;
            
            Logger.LogInformation(
                "User status changed: User ID: {UserId}, UserName: {UserName}, Previous Status: {PreviousStatus}, New Status: {NewStatus}, Changed by: {AdminId}",
                entity.Id, entity.Username, previousStatus, entity.IsActive, CurrentUserService.UserId);
        }

        entity.ModifiedAt = DateTime.UtcNow;
        entity.ModifiedBy = CurrentUserService.UserId?.ToString();

        return Task.CompletedTask;
    }

    protected override Task<UserProfileDto> CreateResponseFromEntityAsync(User entity, UpdateUserProfileDto dto, CancellationToken cancellationToken)
    {
        var response = new UserProfileDto
        {
            Id = entity.Id,
            UserName = entity.Username,
            Email = entity.Email,
            Roles = entity.Roles,
            IsActive = entity.IsActive,
            ModifiedAt = entity.ModifiedAt,
            ModifiedBy = entity.ModifiedBy
        };

        return Task.FromResult(response);
    }
    
    private bool IsValidEmail(string email)
    {
        try {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch {
            return false;
        }
    }
}