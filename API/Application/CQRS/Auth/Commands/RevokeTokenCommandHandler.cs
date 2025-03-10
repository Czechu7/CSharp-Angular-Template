using Application.Common.Interfaces;
using Application.Common.Models;
using MediatR;

namespace Application.CQRS.Auth.Commands.RefreshToken;

public class RevokeTokenCommandHandler : IRequestHandler<RevokeTokenCommand, ResponseBase>
{
    private readonly IAuthService _authService;

    public RevokeTokenCommandHandler(IAuthService authService)
    {
        _authService = authService;
    }

    public async Task<ResponseBase> Handle(RevokeTokenCommand request, CancellationToken cancellationToken)
    {
        var success = await _authService.RevokeToken(request.RefreshTokenDto.RefreshToken);
        
        if (success)
            return ResponseBase.SuccessResponse();
            
        return ResponseBase.SuccessResponse("Token not found");
    }
}