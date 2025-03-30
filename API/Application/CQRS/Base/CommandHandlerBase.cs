using Application.Common.Models;
using MediatR;
using Microsoft.Extensions.Logging;
using Autofac.Extras.DynamicProxy;
using Application.Common.Interfaces;
using InjectAttribute = Application.Common.Attributes.InjectAttribute;
using Application.Common.Interceptors;

namespace Application.CQRS.Base;

[Intercept(typeof(PropertyInjectionInterceptor))]
public abstract class BaseCommandHandler<TCommand, TResponse> : IRequestHandler<TCommand, Response<TResponse>>
    where TCommand : IRequest<Response<TResponse>>
{

    [Inject] protected IApplicationDbContext DbContext { get; set; } = null!;
    [Inject] protected IPasswordService PasswordService { get; set; } = null!;
    [Inject] protected ITokenService TokenService { get; set; } = null!;
    [Inject] protected ILogger<BaseCommandHandler<TCommand, TResponse>> Logger { get; set; } = null!;
    [Inject] protected ICurrentUserService CurrentUserService { get; set; } = null!;
    

    public virtual Task<Response<TResponse>> Handle(TCommand request, CancellationToken cancellationToken)
    {
        ValidateServices();
        return Task.FromResult(Response<TResponse>.ErrorResponse(500, "Not implemented"));
    }
    protected Response<TResponse> SuccessWithData(TResponse data, string message = "Operations successful")
        => Response<TResponse>.SuccessWithData(data, message);

    protected Response<ResponseBase> Success(string message = "Operation successful")
        => new Response<ResponseBase>
        {
            StatusCode = 200,
            Message = message,
            Success = true
        };

    protected Response<TResponse> Error(int statusCode, string message)
        => Response<TResponse>.ErrorResponse(statusCode, message);
    protected void ValidateServices()
    {
        if (DbContext == null)
            throw new InvalidOperationException($"{nameof(DbContext)} is not initialized");

        if (PasswordService == null)
            throw new InvalidOperationException($"{nameof(PasswordService)} is not initialized");

        if (TokenService == null)
            throw new InvalidOperationException($"{nameof(TokenService)} is not initialized");

        if (Logger == null)
            throw new InvalidOperationException($"{nameof(Logger)} is not initialized");

        if (CurrentUserService == null)
            throw new InvalidOperationException($"{nameof(CurrentUserService)} is not initialized");
    }
}