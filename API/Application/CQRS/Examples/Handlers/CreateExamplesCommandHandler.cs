using System;
using Application.Common.Models;
using Application.CQRS.Base.Commands;
using Application.CQRS.Examples.Commands;
using Application.CQRS.Examples.DTOs;

namespace Application.CQRS.Examples.Handlers;

public class CreateExamplesCommandHandler : CreateCommandHandler<CreateExamplesDTO, Domain.Entities.Example>
{

}
