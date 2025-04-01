using System;
using System.ComponentModel.DataAnnotations;
using Application.Common.Mappings;

namespace Application.CQRS.Karmelki.DTOs;

public class KarmelkiDto : IMapBidirectional<Domain.Entities.Karmelki>
{
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    [Range(0, 10000)]
    public int Count { get; set; }
    [Required]
    [Range(0.00, 10000.00)]
    public float Price { get; set; }
    [Required]
    public bool IsZiemniak{ get; set; } = false;
    [Required]
    public int DateTime { get; set; }
}
