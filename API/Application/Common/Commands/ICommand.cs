using Application.Common.Models;
using MediatR;

namespace Application.Common.Commands;
public interface ICommand<TResponse> : IRequest<Response<TResponse>>
{
}

public interface ICommand : IRequest
{
}