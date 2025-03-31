using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Karmelki.Commands;
using Application.CQRS.Karmelki.DTOs;
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
}