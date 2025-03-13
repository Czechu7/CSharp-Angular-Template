using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Presentation;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddMvc()
            .AddApplicationPart(Assembly.GetExecutingAssembly());
            
        return services;
    }
}