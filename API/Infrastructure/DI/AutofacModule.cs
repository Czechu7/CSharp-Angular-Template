using Application.Common.Models;
using Application.Common.Queries;
using Application.CQRS.Base.Commands;
using Application.CQRS.Base.Queries;
using Autofac;
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

            RegisterMediatrHandlers(builder, applicationAssembly);
            RegisterInheritedQueryHandlers(builder, applicationAssembly);
            RegisterClosedGenericHandlers(builder, applicationAssembly);
            RegisterGenericHandlers(builder);
        }
        private void RegisterInheritedQueryHandlers(ContainerBuilder builder, Assembly assembly)
        {
           
            var derivedHandlerTypes = assembly.GetTypes()
                .Where(t => !t.IsAbstract && !t.IsGenericTypeDefinition)
                .Where(t => t.BaseType != null && t.BaseType.IsGenericType &&
                            t.BaseType.GetGenericTypeDefinition() == typeof(GetByIdQueryHandler<,>));

            foreach (var handlerType in derivedHandlerTypes)
            {
               
                var baseType = handlerType.BaseType;
                if (baseType == null)
                    continue;
                var genericArguments = baseType.GetGenericArguments();
                var resultType = genericArguments[0];
                var entityType = genericArguments[1];


                var queryType = assembly.GetTypes()
                    .FirstOrDefault(t => !t.IsAbstract && !t.IsGenericTypeDefinition &&
                                        t.BaseType == typeof(GetByIdQuery<>).MakeGenericType(resultType));

                if (queryType != null)
                {

                    var requestHandlerType = typeof(IRequestHandler<,>).MakeGenericType(queryType, typeof(Response<>).MakeGenericType(resultType));


                    builder.RegisterType(handlerType)
                        .As(requestHandlerType)
                        .InstancePerLifetimeScope();
                }
            }
        }
        private void RegisterMediatrHandlers(ContainerBuilder builder, Assembly assembly)
        {
            builder.RegisterAssemblyTypes(assembly)
                .AsClosedTypesOf(typeof(IRequestHandler<,>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterAssemblyTypes(assembly)
                .AsClosedTypesOf(typeof(INotificationHandler<>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }

        private void RegisterClosedGenericHandlers(ContainerBuilder builder, Assembly assembly)
        {

            var queryHandlerTypes = assembly.GetTypes()
                .Where(t => t.Name.EndsWith("QueryHandler") && !t.IsAbstract && !t.IsGenericTypeDefinition);

            foreach (var handlerType in queryHandlerTypes)
            {
                var interfaces = handlerType.GetInterfaces()
                    .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IRequestHandler<,>));

                foreach (var handlerInterface in interfaces)
                {
                    builder.RegisterType(handlerType)
                        .As(handlerInterface)
                        .InstancePerLifetimeScope();
                }
            }
            var commandHandlerTypes = assembly.GetTypes()
                .Where(t => t.Name.EndsWith("CommandHandler") && !t.IsAbstract && !t.IsGenericTypeDefinition);

            foreach (var handlerType in commandHandlerTypes)
            {
                var interfaces = handlerType.GetInterfaces()
                    .Where(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IRequestHandler<,>));

                foreach (var handlerInterface in interfaces)
                {
                    builder.RegisterType(handlerType)
                        .As(handlerInterface)
                        .InstancePerLifetimeScope();
                }
            }
        }

        private void RegisterGenericHandlers(ContainerBuilder builder)
        {
            builder.RegisterGeneric(typeof(GetByIdQueryHandler<,>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterGeneric(typeof(GetAllQueryHandler<,>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();

            builder.RegisterGeneric(typeof(CreateCommandHandler<,>))
                .AsImplementedInterfaces()
                .InstancePerLifetimeScope();
        }
    }
}