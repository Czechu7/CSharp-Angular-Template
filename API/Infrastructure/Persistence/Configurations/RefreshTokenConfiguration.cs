using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class RefreshTokenConfiguration : IEntityTypeConfiguration<RefreshToken>
{
    public void Configure(EntityTypeBuilder<RefreshToken> builder)
    {
        builder.ToTable("RefreshTokens");
        
        builder.HasKey(r => r.Id);
        
        builder.Property(r => r.Token)
            .IsRequired()
            .HasMaxLength(128);
            
        builder.Property(r => r.ExpiryDate)
            .IsRequired();
            
        builder.Property(r => r.IsRevoked)
            .IsRequired();
            
        builder.Property(r => r.IsUsed)
            .IsRequired();
        
        builder.Property(r => r.ReplacedByToken)
            .HasMaxLength(128);
            
        builder.Property(r => r.RevokedReason)
            .HasMaxLength(256);
            
        builder.HasOne(r => r.User)
            .WithMany(u => u.RefreshTokens)
            .HasForeignKey(r => r.UserId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}