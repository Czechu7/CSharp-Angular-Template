using System.Net;
using System.Text.Json;
using Application.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Builder;

namespace Infrastructure.Middleware;

public class ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            await HandleExceptionAsync(context, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";

        var response = exception switch
        {

            Application.Common.Exceptions.ValidationException validationEx =>
                CreateProblemDetails(HttpStatusCode.BadRequest, "Validation error", "false", validationEx.Errors),

            FluentValidation.ValidationException fluentValidationEx =>
                CreateProblemDetailsFromFluentValidation(HttpStatusCode.BadRequest, "Validation error", "false", fluentValidationEx),

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


    private static ResponseBase CreateProblemDetailsFromFluentValidation(
        HttpStatusCode statusCode,
        string message,
        string success,
        FluentValidation.ValidationException exception)
    {
        var errorsDictionary = new Dictionary<string, string[]>();

        foreach (var error in exception.Errors)
        {
            if (errorsDictionary.ContainsKey(error.PropertyName))
            {
                var existingErrors = errorsDictionary[error.PropertyName].ToList();
                existingErrors.Add(error.ErrorMessage);
                errorsDictionary[error.PropertyName] = existingErrors.ToArray();
            }
            else
            {
                errorsDictionary[error.PropertyName] = new[] { error.ErrorMessage };
            }
        }

        return CreateProblemDetails(statusCode, message, success, errorsDictionary);
    }

    private static ResponseBase CreateProblemDetails(
        HttpStatusCode statusCode,
        string message,
        string success = "false",
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