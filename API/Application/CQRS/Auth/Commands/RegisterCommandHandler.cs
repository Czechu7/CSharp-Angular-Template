using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.DTOs;
using MediatR;

namespace Application.CQRS.Auth.Commands.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, Response<AuthResponseDto>>
{
    private readonly IAuthService _authService;

    public RegisterCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task<Response<AuthResponseDto>> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        return await _authService.Register(request.RegisterDto);
    }
}