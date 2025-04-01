using System;
using System.ComponentModel.DataAnnotations;
using Application.Common.Mappings;

namespace Application.CQRS.Karmelki.DTOs;

public class KarmelkiResponseDto : IMapBidirectional<Domain.Entities.Karmelki>
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Count { get; set; }
    public float Price { get; set; }
    public bool IsZiemniak{ get; set; } = false;
    public int DateTime { get; set; }
}
