using Application.Common.Models;
using Application.CQRS.Examples.Commands;
using Application.CQRS.Examples.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace Presentation.Controllers;

[EnableRateLimiting("auth")]
public class ExamplesController : ApiControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(ResponseBase), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ResponseBase>> CreateExample([FromBody] CreateExamplesDTO createExamplesDTO)
    {
        var command = new CreateExamplesCommand(createExamplesDTO);
        var response = await Mediator.Send(command);

        if (!response.Success)
        {
            return BadRequest(response);
        }

        return Ok(response);
    }
}
