using Application.Common.Models;
using Application.CQRS.Auth.Commands.Login;
using Application.CQRS.Auth.Commands.RefreshToken;
using Application.CQRS.Auth.Commands.Register;
using Application.CQRS.Auth.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presentation.Controllers;

namespace API.Presentation.Controllers;

public class AuthController : ApiControllerBase
{
    [HttpPost("register")]
    [ProducesResponseType(typeof(Response<AuthResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Response<AuthResponseDto>>> Register([FromBody] RegisterDto registerDto)
    {
        var response = await Mediator.Send(new RegisterCommand(registerDto));
        
        if (response.Success)
            return Ok(response);
            
        return BadRequest(response);
    }
    
    [HttpPost("login")]
    [ProducesResponseType(typeof(Response<AuthResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public async Task<ActionResult<Response<AuthResponseDto>>> Login([FromBody] LoginDto loginDto)
    {
        var response = await Mediator.Send(new LoginCommand(loginDto));
        
        if (response.Success)
            return Ok(response);
            
        return Unauthorized();
    }
    
    [HttpPost("refresh-token")]
    [ProducesResponseType(typeof(Response<AuthResponseDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Response<AuthResponseDto>>> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
    {
        var response = await Mediator.Send(new RefreshTokenCommand(refreshTokenDto));
        
        if (response.Success)
            return Ok(response);
            
        return BadRequest(response);
    }
    
    [Authorize]
    [HttpPost("revoke-token")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> RevokeToken([FromBody] RefreshTokenDto refreshTokenDto)
    {
        var result = await Mediator.Send(new RevokeTokenCommand(refreshTokenDto));
        
        if (result.Success)
            return Ok(result);
            
        return BadRequest(result);
    }
}