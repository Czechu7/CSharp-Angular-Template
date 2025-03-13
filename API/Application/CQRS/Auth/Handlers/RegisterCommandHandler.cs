using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Domain.Entities;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Auth.Handlers;

public class RegisterCommandHandler(
    IGenericRepository<User> userRepository,
    IPasswordService passwordService,
    ILogger<RegisterCommandHandler> logger) : IRequestHandler<RegisterCommand, ResponseBase>
{
    private readonly IGenericRepository<User> _userRepository = userRepository;
    private readonly IPasswordService _passwordService = passwordService;
    private readonly ILogger<RegisterCommandHandler> _logger = logger;

    public async Task<ResponseBase> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var existingUsers = await _userRepository.FindAsync(u => 
                u.Email.ToLower() == request.RegisterData.Email.ToLower() ||
                u.Username.ToLower() == request.RegisterData.Username.ToLower());

            if (existingUsers.Count > 0)
            {
                return ResponseBase.ErrorResponse(400, "Username or email already exists");
            }

            var user = new User
            {
                Username = request.RegisterData.Username,
                Email = request.RegisterData.Email,
                FirstName = request.RegisterData.FirstName,
                LastName = request.RegisterData.LastName,
                PasswordHash = _passwordService.HashPassword(request.RegisterData.Password),
                SecurityStamp = _passwordService.GenerateSecurityStamp(),
                IsActive = true,
                CreatedAt = DateTime.UtcNow,
                Roles = "USER"
            };

            await _userRepository.AddAsync(user);
            
            return ResponseBase.SuccessResponse("User registered successfully");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error registering user");
            return ResponseBase.ErrorResponse(500, "An error occurred while registering the user");
        }
    }
}