using Application.Common.Commands;
using Application.Common.Models;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Application.CQRS.Base;

public abstract class CommandHandlerBase<TCommand>(ILogger<CommandHandlerBase<TCommand>> logger)
    : IRequestHandler<TCommand, ResponseBase>
    where TCommand : ICommand<ResponseBase>, IRequest<ResponseBase>
{
    protected readonly ILogger<CommandHandlerBase<TCommand>> Logger = logger;

    public virtual async Task<ResponseBase> Handle(TCommand request, CancellationToken cancellationToken)
    {
        try
        {
            await HandleCommand(request, cancellationToken);
            return ResponseBase.SuccessResponse();
        }
        catch (Exception ex)
        {
            Logger.LogError(ex, "Error handling {CommandType}: {Message}", typeof(TCommand).Name, ex.Message);
            return ResponseBase.ErrorResponse(500, ex.Message);
        }
    }

    protected abstract Task HandleCommand(TCommand request, CancellationToken cancellationToken);
}