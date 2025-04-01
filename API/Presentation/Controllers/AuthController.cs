using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Presentation.Controllers;

[EnableRateLimiting("auth")]
public class AuthController : ApiControllerBase
{
    [HttpPost("register")]
    [ProducesResponseType(typeof(ResponseBase), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ResponseBase>> Register([FromBody] RegisterDto registerDto)
    {
        var command = new RegisterCommand(registerDto);
        var response = await Mediator.Send(command);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpPost("login")]
    [ProducesResponseType(typeof(Response<AuthResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Response<AuthResponseDto>>> Login([FromBody] LoginDto loginDto)
    {
        var command = new LoginCommand(loginDto);
        var response = await Mediator.Send(command);

        if (!response.Success)
        {
            if (response.StatusCode == 401)
                return Unauthorized(response);

            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpPost("refresh-token")]
    [ProducesResponseType(typeof(Response<AuthResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Response<AuthResponseDto>>> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
    {
        var command = new RefreshTokenCommand(refreshTokenDto);
        var response = await Mediator.Send(command);

        if (!response.Success)
        {
            if (response.StatusCode == 401)
                return Unauthorized(response);

            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpPost("revoke-token")]
    [Authorize]
    [ProducesResponseType(typeof(ResponseBase), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<ResponseBase>> RevokeToken([FromBody] RevokeTokenDto revokeTokenDto)
    {
        var command = new RevokeTokenCommand(revokeTokenDto);
        var response = await Mediator.Send(command);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

}