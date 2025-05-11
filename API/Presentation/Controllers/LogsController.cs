using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Presentation.Controllers;

//[Authorize(Policy = "RequireAdminRole")] uncomment if you want to restrict access to this controller
public class LogsController : ApiControllerBase
{
    private readonly ICassandraLogService _cassandraLogService;

    public LogsController(ICassandraLogService cassandraLogService)
    {
        _cassandraLogService = cassandraLogService;
    }

    [HttpGet("security")]
    public async Task<ActionResult<IEnumerable<SecurityEventLog>>> GetSecurityLogs(
        [FromQuery] string? userId = null,
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null,
        [FromQuery] int? statusCode = null,
        [FromQuery] int limit = 100)
    {
        var logs = await _cassandraLogService.GetSecurityEventsAsync(userId, fromDate, toDate, statusCode, limit);
        return Ok(logs);
    }

    [HttpGet("errors")]
    public async Task<ActionResult<IEnumerable<ApplicationErrorLog>>> GetErrorLogs(
        [FromQuery] string? userId = null,
        [FromQuery] DateTime? fromDate = null,
        [FromQuery] DateTime? toDate = null,
        [FromQuery] int limit = 100)
    {
        var logs = await _cassandraLogService.GetApplicationErrorsAsync(userId, fromDate, toDate, limit);
        return Ok(logs);
    }
}