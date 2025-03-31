using Application.Common.Behaviors;
using Application.Common.Interceptors;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.Handlers;
using Application.CQRS.Base;
using Application.CQRS.Base.Commands;
using Application.CQRS.Base.Queries;
using Autofac;
using Autofac.Extras.DynamicProxy;
using Castle.DynamicProxy;
using Infrastructure.Persistence;
using Infrastructure.Services;
using MediatR;
using Microsoft.Extensions.Logging;
using System.Reflection;

namespace Infrastructure.DI
{
    public class AutofacModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            var applicationAssembly = typeof(Application.DependencyInjection).Assembly;

            RegisterCoreServices(builder);

            RegisterDbContext(builder);

            RegisterHandlers(builder, applicationAssembly);

            RegisterGenericHandlers(builder);

            RegisterMediatRHandlers(builder, applicationAssembly);
        }

        private void RegisterCoreServices(ContainerBuilder builder)
        {
            builder.RegisterGeneric(typeof(Logger<>)).As(typeof(ILogger<>)).SingleInstance();
            builder.RegisterType<LoggerFactory>().As<ILoggerFactory>().SingleInstance();
            builder.RegisterType<PropertyInjectionInterceptor>().AsSelf().SingleInstance();
            builder.RegisterGeneric(typeof(LoggingBehavior<,>)).As(typeof(IPipelineBehavior<,>)).InstancePerLifetimeScope();
            builder.RegisterType<PasswordService>().As<IPasswordService>().InstancePerLifetimeScope();
            builder.RegisterType<TokenService>().As<ITokenService>().InstancePerLifetimeScope();
            builder.RegisterType<LazyDbContextInterceptor>().AsSelf().InstancePerLifetimeScope();
            builder.RegisterType<CurrentUserService>().As<ICurrentUserService>().InstancePerLifetimeScope();
            builder.RegisterType<Mediator>().As<IMediator>().InstancePerLifetimeScope();
        }

        private void RegisterDbContext(ContainerBuilder builder)
        {
            builder.RegisterType<ApplicationDbContext>()
                .Named<IApplicationDbContext>("CSharpAngularTemplateDB")
                .InstancePerLifetimeScope();

            var proxyGenerator = new ProxyGenerator();
            builder.Register(c =>
            {
                var scope = c.Resolve<ILifetimeScope>();
                var interceptor = new LazyDbContextInterceptor(scope);
                return proxyGenerator.CreateInterfaceProxyWithoutTarget<IApplicationDbContext>(interceptor);
            })
            .As<IApplicationDbContext>()
            .InstancePerLifetimeScope();
        }
        private void RegisterMediatRHandlers(ContainerBuilder builder, Assembly applicationAssembly)
        {
            builder.RegisterAssemblyTypes(applicationAssembly)
                .AsClosedTypesOf(typeof(INotificationHandler<>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            var handlerTypes = applicationAssembly.GetTypes()
                .Where(t => !t.IsAbstract && !t.IsGenericTypeDefinition &&
                            t.GetInterfaces().Any(i => i.IsGenericType &&
                                                    i.GetGenericTypeDefinition() == typeof(IRequestHandler<,>)))
                .ToList();

            foreach (var handlerType in handlerTypes)
            {
                var handlerInterfaces = handlerType.GetInterfaces()
                    .Where(i => i.IsGenericType &&
                           i.GetGenericTypeDefinition() == typeof(IRequestHandler<,>))
                    .ToList();

                foreach (var handlerInterface in handlerInterfaces)
                {
                    bool useClassInterceptor = handlerType.GetCustomAttributes(typeof(InterceptAttribute), true).Any() ||
                                               (handlerType.BaseType != null &&
                                                handlerType.BaseType.GetCustomAttributes(typeof(InterceptAttribute), true).Any());

                    var registration = builder.RegisterType(handlerType).As(handlerInterface);

                    if (useClassInterceptor)
                    {
                        registration.EnableClassInterceptors();
                    }
                    else
                    {
                        registration.EnableInterfaceInterceptors();
                    }

                    registration.InterceptedBy(typeof(PropertyInjectionInterceptor))
                              .InstancePerLifetimeScope();
                }
            }
        }
        private void RegisterHandlers(ContainerBuilder builder, Assembly applicationAssembly)
        {
            builder.RegisterAssemblyTypes(applicationAssembly)
                .Where(t => t.GetInterfaces()
                    .Any(i => i.IsGenericType &&
                             i.GetGenericTypeDefinition() == typeof(IRequestHandler<,>)))
                .AsImplementedInterfaces()
                .EnableClassInterceptors()
                .InterceptedBy(typeof(PropertyInjectionInterceptor))
                .InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(applicationAssembly)
                .AsClosedTypesOf(typeof(INotificationHandler<>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
        private void RegisterGenericHandlers(ContainerBuilder builder)
        {
            var genericHandlerTypes = new[] {
        typeof(CreateCommandHandler<,,,>),     // 4 type parameters: TCommand, TResponse, TDto, TEntity
        typeof(UpdateCommandHandler<,,,>),     // 4 type parameters: TCommand, TResponse, TDto, TEntity
        typeof(DeleteCommandHandler<,,>),      // 3 type parameters: TCommand, TResponse, TEntity
        typeof(GetByIdQueryHandler<,,>),       // 3 type parameters: TCommand, TResult, TEntity
        typeof(GetAllQueryHandler<,,>),        // 3 type parameters: TCommand, TResult, TEntity
        typeof(GetPagedQueryHandler<,,>)       // 3 type parameters: TCommand, TResult, TEntity
    };


            foreach (var handlerType in genericHandlerTypes)
            {
                builder.RegisterGeneric(handlerType)
                    .As(typeof(IRequestHandler<,>))
                    .EnableInterfaceInterceptors()
                    .InterceptedBy(typeof(PropertyInjectionInterceptor))
                    .InstancePerLifetimeScope();
            }
        }

    }
}