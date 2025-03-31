using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Karmelki.Commands;
using Application.CQRS.Karmelki.DTOs;
using Application.CQRS.Karmelki.Queries;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Presentation.Controllers;

[EnableRateLimiting("auth")]
[Authorize]
public class KarmelkiController : ApiControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(ResponseBase), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ResponseBase>> Create([FromBody] KarmelkiDto karmelkiDto)
    {
        var command = new CreateKarmelkiCommand(karmelkiDto);
        var response = await Mediator.Send(command);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }

    [HttpGet]
    [ProducesResponseType(typeof(Response<List<KarmelkiDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Response<List<KarmelkiDto>>>> GetAll([FromQuery] bool includeInactive = false)
    {
        var query = new GetKarmelkiQuery(includeInactive);
        var response = await Mediator.Send(query);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
    [HttpGet("{id}")]
    [ProducesResponseType(typeof(Response<KarmelkiDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<ActionResult<Response<KarmelkiDto>>> GetById(Guid id)
    {
        var query = new GetByIdKarmelkiQuery(id);
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

    [HttpGet("pageable")]
    [ProducesResponseType(typeof(Response<PagedResult<KarmelkiDto>>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Response<PagedResult<KarmelkiDto>>>> GetPaged(
    [FromQuery] int pageNumber = 1,
    [FromQuery] int pageSize = 10,
    [FromQuery] string? searchTerm = null,
    [FromQuery] string? sortBy = null,
    [FromQuery] bool sortDescending = false)
    {
        var query = new GetPagedKarmelkiQuery(pageNumber, pageSize, searchTerm, sortBy, sortDescending);
        var response = await Mediator.Send(query);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
}