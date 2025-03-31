using System;
using System.ComponentModel.DataAnnotations;

namespace Application.CQRS.Karmelki.DTOs;

public class DeleteKarmelkiDto
{
    [Required]
    public Guid Id { get; set; } = Guid.Empty;
}
