using MediatR;

namespace Application.Common.Commands;

public interface ICommand<TResponse> : IRequest<TResponse>
{
}

public interface ICommand : IRequest
{
}