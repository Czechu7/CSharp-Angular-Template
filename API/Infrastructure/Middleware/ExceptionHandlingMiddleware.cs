using System.Net;
using System.Text.Json;
using Application.Common.Exceptions;
using Application.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace Infrastructure.Middleware;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandlex excepttion: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        
        var response = exception switch
        {
            Application.Common.Exceptions.ValidationException validationEx => 
                CreateProblemDetails(HttpStatusCode.BadRequest, "Validation error", validationEx.Errors),
                
            Application.Common.Exceptions.NotFoundException notFoundEx => 
                CreateProblemDetails(HttpStatusCode.NotFound, notFoundEx.Message),
                
            Application.Common.Exceptions.ApplicationException appEx => 
                CreateProblemDetails(HttpStatusCode.BadRequest, appEx.Message),
                
            UnauthorizedAccessException => 
                CreateProblemDetails(HttpStatusCode.Unauthorized, "No permission to access this resource."),
                
            _ => CreateProblemDetails(HttpStatusCode.InternalServerError, "An error occurred while processing your request.")
        };

        context.Response.StatusCode = (int)response.StatusCode;
        
        await context.Response.WriteAsync(JsonSerializer.Serialize(response));
    }

    private static ResponseBase CreateProblemDetails(
        HttpStatusCode statusCode, 
        string message, 
        IDictionary<string, string[]>? errors = null)
    {
        List<string>? errorsList = null;
        
        if (errors != null)
        {
            errorsList = new List<string>();
            foreach (var error in errors)
            {
                errorsList.AddRange(error.Value.Select(e => $"{error.Key}: {e}"));
            }
        }

        return ResponseBase.ErrorResponse((int)statusCode, message, errorsList);
    }
}


public static class MiddlewareExtensions
{
    public static IApplicationBuilder UseCustomExceptionHandler(this IApplicationBuilder app)
    {
        return app.UseMiddleware<ExceptionHandlingMiddleware>();
    }
}