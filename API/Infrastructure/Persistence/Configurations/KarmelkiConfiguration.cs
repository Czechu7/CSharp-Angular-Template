using System;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class KarmelkiConfiguration: IEntityTypeConfiguration<Karmelki>
{
    public void Configure(EntityTypeBuilder<Karmelki> builder)
    {
        builder.ToTable("Karmelki");
        
        builder.HasKey(r => r.Id);

          builder.Property(r => r.Name)
            .IsRequired()
            .HasMaxLength(200);
        
        builder.Property(r => r.Count)
            .IsRequired()
            .HasDefaultValue(0);
            
        builder.Property(r => r.Price)
            .IsRequired()
            .HasColumnType("decimal(18,2)");
            
        builder.Property(r => r.IsZiemniak)
            .IsRequired()
            .HasDefaultValue(false);
            
        builder.Property(r => r.DateTime)
            .IsRequired();
            
        builder.HasOne(r => r.User)
            .WithMany(u => u.Karmelki)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
