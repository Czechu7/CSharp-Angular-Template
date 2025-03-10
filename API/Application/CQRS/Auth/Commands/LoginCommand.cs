using Application.Common.Models;
using Application.CQRS.Auth.DTOs;
using MediatR;

namespace Application.CQRS.Auth.Commands.Login;

public record LoginCommand(LoginDto LoginDto) : IRequest<Response<AuthResponseDto>>;