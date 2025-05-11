using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.RateLimiting;

namespace Infrastructure.Security;

public static class SecurityExtensions
{
    public static IServiceCollection AddRateLimitingServices(this IServiceCollection services)
    {
        services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

            options.AddPolicy("standard", context =>
            {
                var clientIp = context.GetClientIpAddress();
                return RateLimitPartition.GetFixedWindowLimiter(clientIp, _ => new()
                {
                    PermitLimit = 100,
                    Window = TimeSpan.FromMinutes(1)
                });
            });

            options.AddPolicy("auth", context =>
            {
                var clientIp = context.GetClientIpAddress();
                return RateLimitPartition.GetFixedWindowLimiter(clientIp, _ => new()
                {
                    PermitLimit = 10,
                    Window = TimeSpan.FromMinutes(1)
                });
            });

            options.AddFixedWindowLimiter("fixed", opt =>
            {
                opt.PermitLimit = 50;
                opt.Window = TimeSpan.FromMinutes(1);
                opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
                opt.QueueLimit = 5;
            });
        });

        services.AddAntiforgery();
        
        services.Configure<ForwardedHeadersOptions>(options =>
        {
            options.ForwardedHeaders = Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedFor | 
                                      Microsoft.AspNetCore.HttpOverrides.ForwardedHeaders.XForwardedProto;
            options.KnownNetworks.Clear();
            options.KnownProxies.Clear();
        });

        return services;
    }

    public static IApplicationBuilder UseSecurityMiddleware(this IApplicationBuilder app)
    {
        app.UseForwardedHeaders();
        app.UseRateLimiter();

        app.Use(async (context, next) =>
        {
            context.Response.Headers.Append("X-Content-Type-Options", "nosniff");
            context.Response.Headers.Append("X-Frame-Options", "DENY");
            context.Response.Headers.Append("X-XSS-Protection", "1; mode=block");
            await next();
        });

        return app;
    }

    public static string GetClientIpAddress(this HttpContext context)
    {
        string? ip = context.Request.Headers["X-Forwarded-For"].FirstOrDefault()?.Split(',').FirstOrDefault() ??
                    context.Request.Headers["X-Real-IP"].FirstOrDefault() ??
                    context.Connection.RemoteIpAddress?.ToString();
                    
        if (string.IsNullOrEmpty(ip) || ip == "::1")
        {
            ip = context.Connection.RemoteIpAddress?.MapToIPv4().ToString();
        }
        
        return !string.IsNullOrEmpty(ip) ? ip : "unknown";
    }
}