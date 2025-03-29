using System.Reflection;
using AutoMapper;

namespace Application.Common.Mappings;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        ApplyMappingsFromAssembly(Assembly.GetExecutingAssembly());
    }

    private void ApplyMappingsFromAssembly(Assembly assembly)
    {
        var mappingInterfaces = new[]
        {
            typeof(IMapFrom<>),
            typeof(IMapTo<>),
            typeof(IMapBidirectional<>)
        };

        const string mappingMethodName = nameof(IMapFrom<object>.Mapping);

        var mappingTypes = assembly.GetExportedTypes()
            .Where(t => t.GetInterfaces().Any(i =>
                i.IsGenericType && mappingInterfaces.Contains(i.GetGenericTypeDefinition())));

        foreach (var type in mappingTypes)
        {
            var instance = Activator.CreateInstance(type);

            var methodInfo = type.GetMethod(mappingMethodName);

            if (methodInfo == null)
            {
                foreach (var interfaceType in type.GetInterfaces()
                    .Where(i => i.IsGenericType && mappingInterfaces.Contains(i.GetGenericTypeDefinition())))
                {
                    methodInfo = interfaceType.GetMethod(mappingMethodName);
                    if (methodInfo != null) break;
                }
            }

            methodInfo?.Invoke(instance, new object[] { this });
        }
    }
}