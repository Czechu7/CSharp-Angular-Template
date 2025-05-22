using Application.Common.Models;
using Application.CQRS.AdminPanel.Commands;
using Application.CQRS.AdminPanel.DTOs;
using Application.CQRS.AdminPanel.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Presentation.Controllers;

[Authorize(Policy = "RequireAdminRole")]
public class AdminPanelController : ApiControllerBase
{
    [HttpPut("{id}")]
    [ProducesResponseType(typeof(Response<UserProfileDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<Response<UserProfileDto>>> UpdateUserProfile(Guid id, [FromBody] UpdateUserProfileDto updateUserProfileDto)
    {
        var command = new UpdateUserProfileCommand(id, updateUserProfileDto);
        var response = await Mediator.Send(command);

        if (!response.Success)
        {
            if (response.StatusCode == 404)
                return NotFound(response);

            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpGet("users")]
    [ProducesResponseType(typeof(Response<PagedResult<UserProfileDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<Response<PagedResult<UserProfileDto>>>> GetPagedUsers(
        [FromQuery] int pageNumber = 1,
        [FromQuery] int pageSize = 10,
        [FromQuery] string? searchTerm = null,
        [FromQuery] string? sortBy = null,
        [FromQuery] bool sortDescending = false,
        [FromQuery] bool includeInactive = false)
    {
        var query = new GetPagedUsersQuery(pageNumber, pageSize, searchTerm, sortBy, sortDescending, includeInactive);
        var response = await Mediator.Send(query);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
    [HttpGet("users/{id}")]
    [ProducesResponseType(typeof(Response<UserProfileDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<Response<UserProfileDto>>> GetUserById(Guid id)
    {
        var query = new GetUserByIdQuery(id);
        var response = await Mediator.Send(query);

        if (!response.Success)
        {
            if (response.StatusCode == 404)
                return NotFound(response);

            return BadRequest(response);
        }

        return Ok(response);
    }
}