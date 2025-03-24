using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Base.Commands;
using Application.CQRS.Users.DTOs;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Auth.Handlers;

public class RegisterCommandHandler : CreateCommandHandler<RegisterDto, User>
{

    public async Task<Response<ResponseBase>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        try
        {
            ValidateServices();

            var user = new User
            {
                Username = request.Data.Username,
                Email = request.Data.Email,
                FirstName = request.Data.FirstName,
                LastName = request.Data.LastName,
                PasswordHash = PasswordService.HashPassword(request.Data.Password),
                SecurityStamp = PasswordService.GenerateSecurityStamp(),
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                Roles = "USER"
            };

            await Repository.AddAsync(user);

            return Success("User registered successfully");
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error registering user");
            return Error(500, "An error occurred while registering the user");
        }
    }


    protected override async Task ValidateCreateAsync(User entity, RegisterDto dto, CancellationToken cancellationToken)
    {
        var validationErrors = new Dictionary<string, List<string>>();

        if (string.IsNullOrWhiteSpace(dto.Username))
        {
            validationErrors.Add("username", ["Username is required"]);
        }
        var userExists = await CurrentUserService.ExistsUserWithEmailOrUsernameAsync(
       dto.Email, dto.Username, cancellationToken);

        if (userExists)
        {
            validationErrors.Add("user", ["Username or email already exists"]);
        }

        else if (dto.Username.Length < 3)
        {
            validationErrors.Add("username", ["Username must be at least 3 characters long"]);
        }

        if (string.IsNullOrWhiteSpace(dto.Email))
        {
            validationErrors.Add("email", ["Email is required"]);
        }
        else if (!IsValidEmail(dto.Email))
        {
            validationErrors.Add("email", ["Invalid email format"]);
        }

        if (string.IsNullOrWhiteSpace(dto.Password))
        {
            validationErrors.Add("password", ["Password is required"]);
        }
        else if (dto.Password.Length < 6)
        {
            validationErrors.Add("password", ["Password must be at least 6 characters long"]);
        }

        if (dto.Password != dto.ConfirmPassword)
        {
            validationErrors.Add("confirmPassword", ["Passwords do not match"]);
        }

        if (string.IsNullOrWhiteSpace(dto.FirstName))
        {
            validationErrors.Add("firstName", ["First name is required"]);
        }

        if (string.IsNullOrWhiteSpace(dto.LastName))
        {
            validationErrors.Add("lastName", ["Last name is required"]);
        }
        if (validationErrors.Any())
        {
            var errors = validationErrors.ToDictionary(
                kvp => kvp.Key,
                kvp => kvp.Value.ToArray());


            var exception = new ValidationException();

            foreach (var kvp in errors)
            {
                (exception.Errors as Dictionary<string, string[]>)?.Add(kvp.Key, kvp.Value);
            }

            throw exception;
        }

        await base.ValidateCreateAsync(entity, dto, cancellationToken);
    }

    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }
}