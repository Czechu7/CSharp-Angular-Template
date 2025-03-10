using Application.Common.Models;
using MediatR;

namespace Application.Common.Queries;

public interface IQuery<TResult> : IRequest<Response<TResult>>
{
}