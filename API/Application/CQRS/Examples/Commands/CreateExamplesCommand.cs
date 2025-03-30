using Application.CQRS.Base.Commands;
using Application.CQRS.Examples.DTOs;

namespace Application.CQRS.Examples.Commands;

public class CreateExamplesCommand(CreateExamplesDTO data) : CreateCommand<CreateExamplesDTO>(data)
{
}
