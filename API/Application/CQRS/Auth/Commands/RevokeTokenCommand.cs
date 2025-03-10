using Application.Common.Models;
using Application.CQRS.Auth.DTOs;
using MediatR;

namespace Application.CQRS.Auth.Commands.RefreshToken;

public record RevokeTokenCommand(RefreshTokenDto RefreshTokenDto) : IRequest<ResponseBase>;