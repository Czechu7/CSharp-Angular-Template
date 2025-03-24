using Application.Common.Behaviors;
using Application.Common.Interceptors;
using Application.Common.Interfaces;
using Application.Common.Models;
using Application.CQRS.Auth.Commands;
using Application.CQRS.Auth.DTOs;
using Application.CQRS.Auth.Handlers;
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

            builder.RegisterGeneric(typeof(Logger<>))
                .As(typeof(ILogger<>))
                .SingleInstance();

            builder.RegisterType<LoggerFactory>()
                .As<ILoggerFactory>()
                .SingleInstance();

            builder.RegisterType<PropertyInjectionInterceptor>()
                .AsSelf()
                .SingleInstance();

            builder.RegisterGeneric(typeof(LoggingBehavior<,>))
                .As(typeof(IPipelineBehavior<,>))
                .InstancePerLifetimeScope();

            builder.RegisterType<PasswordService>().As<IPasswordService>().InstancePerLifetimeScope();
            builder.RegisterType<TokenService>().As<ITokenService>().InstancePerLifetimeScope();

            builder.RegisterType<LazyDbContextInterceptor>().AsSelf().InstancePerLifetimeScope();

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


            builder.RegisterType<CurrentUserService>().As<ICurrentUserService>().InstancePerLifetimeScope();


            builder.RegisterType<RegisterCommandHandler>()
                .As<IRequestHandler<RegisterCommand, Response<ResponseBase>>>() 
                .EnableClassInterceptors()
                .InterceptedBy(typeof(PropertyInjectionInterceptor))
                .InstancePerLifetimeScope();

            builder.RegisterType<LoginCommandHandler>()
                .As<IRequestHandler<LoginCommand, Response<AuthResponseDto>>>() 
                .EnableClassInterceptors()
                .InterceptedBy(typeof(PropertyInjectionInterceptor))
                .InstancePerLifetimeScope();

            builder.RegisterType<RefreshTokenCommandHandler>()
                .As<IRequestHandler<RefreshTokenCommand, Response<AuthResponseDto>>>() 
                .InstancePerLifetimeScope();

            builder.RegisterType<RevokeTokenCommandHandler>()
                .As<IRequestHandler<RevokeTokenCommand, ResponseBase>>() 
                .InstancePerLifetimeScope();


            builder.RegisterAssemblyTypes(applicationAssembly)
                .Where(t => t.Name.EndsWith("Handler") &&
                           !t.Name.Equals(nameof(RegisterCommandHandler)) &&
                           !t.Name.Equals(nameof(LoginCommandHandler)) &&
                           !t.Name.Equals(nameof(RefreshTokenCommandHandler)) &&
                           !t.Name.Equals(nameof(RevokeTokenCommandHandler)))
                .AsClosedTypesOf(typeof(IRequestHandler<,>))
                .AsImplementedInterfaces()
                .EnableClassInterceptors()
                .InterceptedBy(typeof(PropertyInjectionInterceptor))
                .InstancePerLifetimeScope();


            builder.RegisterAssemblyTypes(applicationAssembly)
                .AsClosedTypesOf(typeof(INotificationHandler<>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();


            RegisterGenericHandlers(builder);
        }

        private void RegisterGenericHandlers(ContainerBuilder builder)
        {
            var doubleGenericHandlerTypes = new[] {
                typeof(GetByIdQueryHandler<,>),
                typeof(GetAllQueryHandler<,>),
                typeof(GetPagedQueryHandler<,>),
                typeof(CreateCommandHandler<,>),
                typeof(UpdateCommandHandler<,>)
            };

            foreach (var handlerType in doubleGenericHandlerTypes)
            {
                builder.RegisterGeneric(handlerType)
                    .AsImplementedInterfaces()
                    .InstancePerLifetimeScope();
            }


            // builder.RegisterGeneric(typeof(DeleteCommandHandler<>))
            //     .AsImplementedInterfaces()
            //     .InstancePerLifetimeScope();
        }
    }
}