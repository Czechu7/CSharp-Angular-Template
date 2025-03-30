using Application.Common.Interfaces;
using Autofac;
using Castle.DynamicProxy;

namespace Infrastructure.DI;


public class LazyDbContextInterceptor(ILifetimeScope lifetimeScope) : IInterceptor
{
    private readonly ILifetimeScope _lifetimeScope = lifetimeScope;
    private IApplicationDbContext? _realDbContext;

    public void Intercept(IInvocation invocation)
    {

        _realDbContext ??= _lifetimeScope.ResolveNamed<IApplicationDbContext>("CSharpAngularTemplateDB");

        invocation.ReturnValue = invocation.Method.Invoke(_realDbContext, invocation.Arguments);
    }
}