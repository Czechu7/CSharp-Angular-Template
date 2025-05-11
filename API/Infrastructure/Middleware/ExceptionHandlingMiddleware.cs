using System.Net;
using System.Text.Json;
using Application.Common.Interfaces;
using Application.Common.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Builder;
using Infrastructure.Security;

namespace Infrastructure.Middleware;

public class ExceptionHandlingMiddleware(
    RequestDelegate next, 
    ILogger<ExceptionHandlingMiddleware> logger,
    ICassandraLogService cassandraLogger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger = logger;
    private readonly ICassandraLogService _cassandraLogger = cassandraLogger;

    public async Task InvokeAsync(HttpContext context, ICurrentUserService currentUserService)
    {
        try
        {
            await _next(context);
            
            var userId = currentUserService.UserId ?? "anonymous";
            var path = context.Request.Path.Value?.Replace("\r", "").Replace("\n", "") ?? "";
            var method = context.Request.Method.Replace("\r", "").Replace("\n", "");
            var ipAddress = context.GetClientIpAddress()?.ToString().Replace("\r", "").Replace("\n", "") ?? "unknown";
            
            if (context.Response.StatusCode == 401 || context.Response.StatusCode == 403)
            {
                var endpoint = context.GetEndpoint();
                var controllerActionDescriptor = endpoint?.Metadata.GetMetadata<ControllerActionDescriptor>();
                var controller = controllerActionDescriptor?.ControllerName ?? "unknown";
                var action = controllerActionDescriptor?.ActionName ?? "unknown";
                
                
                string resourceId = "unknown";
                if (context.Request.RouteValues.TryGetValue("id", out var id))
                {
                    resourceId = id?.ToString() ?? "unknown";
                }
                
                await _cassandraLogger.LogSecurityEventAsync(
                    userId: userId,
                    action: $"{method} {path}",
                    resource: $"{controller}/{action}",
                    resourceId: resourceId,
                    result: "Denied",
                    statusCode: context.Response.StatusCode,
                    ipAddress: ipAddress,  
                    message: context.Response.StatusCode == 401 ? "Unauthorized" : "Forbidden"
                );
                
                _logger.LogWarning(
                    "Security event: {StatusCode} {Method} {Path} by user {UserId} from IP {IpAddress}", 
                    context.Response.StatusCode,
                    method,
                    path, 
                    userId,
                    ipAddress);
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception: {Message}", ex.Message);
            
            
            var userId = currentUserService?.UserId ?? "anonymous";
            var ipAddress = context.GetClientIpAddress()?.ToString() ?? "unknown";
            var path = context.Request.Path.Value ?? "";
            await _cassandraLogger.LogApplicationErrorAsync(
                ex,
                $"Unhandled exception in {context.Request.Method} {path}",
                userId);
                
            await _cassandraLogger.LogSecurityEventAsync(
                userId,
                "ACTION_NAME",
                "RESOURCE_PATH",
                "RESOURCE_ID",
                "RESULT",
                context.Response.StatusCode,
                ipAddress,
                "MESSAGE",
                "ADDITIONAL_DATA"
            );

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
                CreateProblemDetails(HttpStatusCode.Forbidden, "No permission to access this resource."),

            System.Security.Authentication.AuthenticationException authEx =>
                CreateProblemDetails(HttpStatusCode.Unauthorized, authEx.Message),

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