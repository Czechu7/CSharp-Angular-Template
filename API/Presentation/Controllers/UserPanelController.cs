using Application.Common.Models;
using Application.CQRS.AdminPanel.Commands;
using Application.CQRS.AdminPanel.DTOs;
using Application.CQRS.AdminPanel.Queries;
using Application.CQRS.UserPanel.Commands;
using Application.CQRS.UserPanel.DTOs;
using Application.CQRS.UserPanel.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using System.Security.Claims;

namespace Presentation.Controllers;

[Authorize]
public class UserPanelController : ApiControllerBase
{
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Response<ResponseBase>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<Response<ResponseBase>>> UpdateUserProfile(Guid id, [FromBody] UpdateUserCredentialsDto updateUserCredentialsDto)
    {
        var command = new UpdateUserCredentialsCommand(id, updateUserCredentialsDto);
        var response = await Mediator.Send(command);

        if (!response.Success)
        {
            if (response.StatusCode == 404)
                return NotFound(response);

            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpGet]
    [ProducesResponseType(typeof(Response<UserCredentialsDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<Response<UserCredentialsDto>>> GetCurrentUser()
    {

        var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? 
                          User.FindFirst("sub")?.Value ?? 
                          User.FindFirst("nameid")?.Value ?? 
                          User.Identity?.Name;

        if (string.IsNullOrEmpty(userIdClaim) || !Guid.TryParse(userIdClaim, out Guid currentUserId))
        {
            return Unauthorized(Response<UserCredentialsDto>.ErrorResponse(401, "User not authenticated"));
        }

        var query = new GetByIdUserCredentialsQuery(currentUserId);
        var response = await Mediator.Send(query);

        if (!response.Success)
        {
            if (response.StatusCode == 404)
                return NotFound(response);
            else if (response.StatusCode == 403)
                return StatusCode(StatusCodes.Status403Forbidden, response);
            else
                return BadRequest(response);
        }

        return Ok(response);
    }
}