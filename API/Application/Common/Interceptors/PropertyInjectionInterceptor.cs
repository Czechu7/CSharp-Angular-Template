using System.Collections.Concurrent;
using System.Reflection;
using System.Runtime.CompilerServices;
using Application.Common.Attributes;
using Autofac;
using Castle.DynamicProxy;
using Microsoft.Extensions.Logging;
namespace Application.Common.Interceptors;
public class PropertyInjectionInterceptor(ILifetimeScope lifetimeScope, ILogger<PropertyInjectionInterceptor> logger) : IInterceptor
{
    private readonly ILifetimeScope _lifetimeScope = lifetimeScope;
    private readonly ConcurrentDictionary<Type, PropertyInfo[]> _propertyCache = new();
    private readonly ILogger<PropertyInjectionInterceptor> _logger = logger;

    public void Intercept(IInvocation invocation)
    {
        InjectProperties(invocation.InvocationTarget);
        
        invocation.Proceed();
    }
    
    private void InjectProperties(object target)
    {
        if (target == null) return;
        
        if (IsAlreadyInjected(target)) return;
        
        var targetType = target.GetType();
        
        var properties = _propertyCache.GetOrAdd(targetType, t => 
            GetAllInjectableProperties(t));
            
        foreach (var property in properties)
        {
            try
            {
                if (property.GetValue(target) != null)
                    continue;
                    
                var propertyType = property.PropertyType;
                var service = _lifetimeScope.Resolve(propertyType);
                
                property.SetValue(target, service);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error injecting {PropertyName}: {ErrorMessage}", property.Name, ex.Message);
            }
        }
        MarkAsInjected(target);
    }
    
    private PropertyInfo[] GetAllInjectableProperties(Type type)
    {
        var result = new List<PropertyInfo>();
        
        while (type != null && type != typeof(object))
        {
            var properties = type.GetProperties(BindingFlags.Public | BindingFlags.NonPublic | 
                                               BindingFlags.Instance | BindingFlags.DeclaredOnly)
                                .Where(p => p.CanWrite && 
                                           p.GetCustomAttribute<InjectAttribute>() != null);
                                           
            result.AddRange(properties);
            type = type.BaseType!;
        }
        
        return result.ToArray();
    }
    
    private static readonly ConditionalWeakTable<object, object> _injectedInstances = new();
    private static readonly object _marker = new();
    
    private bool IsAlreadyInjected(object target) => _injectedInstances.TryGetValue(target, out _);
    
    private void MarkAsInjected(object target) => _injectedInstances.Add(target, _marker);
}