using System.Security.Claims;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.RateLimiting;

namespace Presentation.Controllers;

[ApiController]
[Route("api/[controller]")]
[EnableRateLimiting("standard")]
public abstract class ApiControllerBase : ControllerBase
{
    private ISender? _mediator;

    protected ISender Mediator => _mediator ??= HttpContext.RequestServices.GetRequiredService<ISender>();
    protected string GetCurrentUserId()
    {
        return User.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new UnauthorizedAccessException("User ID not found.");
    }

    protected bool IsInRole(string role)
    {
        return User.IsInRole(role);
    }

    protected IActionResult ForbiddenIfNotInRole(string role)
    {
        return IsInRole(role) ? Ok() : Forbid();
    }
}