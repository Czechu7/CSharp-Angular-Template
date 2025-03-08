using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using Application;

namespace Presentation;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddMvc()
            .AddApplicationPart(Assembly.GetExecutingAssembly());
            
        // Add any presentation-specific services here
            
        return services;
    }
}