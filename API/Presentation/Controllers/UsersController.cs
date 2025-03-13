using Application.Common.Models;
using Application.CQRS.Users.Commands.CreateUser;
using Application.CQRS.Users.Queries.GetUserById;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Presentation.Controllers;
using Application.CQRS.Users.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace API.Presentation.Controllers;

public class UsersController : ApiControllerBase
{
    // [HttpGet]
    // [ProducesResponseType(typeof(Response<List<UserDto>>), StatusCodes.Status200OK)]
    // public async Task<ActionResult<Response<List<UserDto>>>> GetAll()
    // {
    //     return await Mediator.Send(new GetAllUsersQuery());
    // }
    
    [HttpGet("{id}")]
    [Authorize(Policy = "ALL")]
    [ProducesResponseType(typeof(Response<UserDto>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Response<UserDto>>> GetById(Guid id)
    {
        return await Mediator.Send(new GetUserByIdQuery(id));
    }
    
    [HttpPost]
    [ProducesResponseType(typeof(ResponseBase), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ResponseBase>> Create(UserDto userDto)
    {
        var response = await Mediator.Send(new CreateUserCommand(userDto));
        
        if (response.Success)
            return CreatedAtAction(nameof(GetById), new { id = userDto.Id }, response);
            
        return BadRequest(response);
    }
    
    // [HttpPut("{id}")]
    // [ProducesResponseType(typeof(ResponseBase), StatusCodes.Status200OK)]
    // [ProducesResponseType(StatusCodes.Status400BadRequest)]
    // [ProducesResponseType(StatusCodes.Status404NotFound)]
    // public async Task<ActionResult<ResponseBase>> Update(Guid id, UserDto userDto)
    // {
    //     var response = await Mediator.Send(new UpdateUserCommand(id, userDto));
        
    //     if (response.Success)
    //         return Ok(response);
            
    //     return response.StatusCode == 404 ? NotFound(response) : BadRequest(response);
    // }
    
    // [HttpDelete("{id}")]
    // [ProducesResponseType(typeof(ResponseBase), StatusCodes.Status200OK)]
    // [ProducesResponseType(StatusCodes.Status404NotFound)]
    // public async Task<ActionResult<ResponseBase>> Delete(Guid id)
    // {
    //     var response = await Mediator.Send(new DeleteUserCommand(id));
        
    //     if (response.Success)
    //         return Ok(response);
            
    //     return NotFound(response);
    // }
}