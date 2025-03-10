using Application.Common.Models;
using Application.CQRS.Auth.DTOs;
using MediatR;

namespace Application.CQRS.Auth.Commands.Register;

public record RegisterCommand(RegisterDto RegisterDto) : IRequest<Response<AuthResponseDto>>;