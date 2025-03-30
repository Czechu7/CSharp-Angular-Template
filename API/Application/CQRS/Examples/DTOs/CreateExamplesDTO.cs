using Application.Common.Mappings;

namespace Application.CQRS.Examples.DTOs;

public class CreateExamplesDTO : IMapBidirectional<Domain.Entities.Example>
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public int Age { get; set; }
    public DateTime DateOfBirth { get; set; }
    public bool IsChanged { get; set; } = false;

}
