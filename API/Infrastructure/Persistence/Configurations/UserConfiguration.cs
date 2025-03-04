using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        
        builder.HasKey(u => u.Id);
        
        builder.Property(u => u.Username)
            .HasMaxLength(100)
            .IsRequired();
            
        builder.Property(u => u.Email)
            .HasMaxLength(200)
            .IsRequired();
            
        builder.Property(u => u.FirstName)
            .HasMaxLength(100);
            
        builder.Property(u => u.LastName)
            .HasMaxLength(100);
            
        builder.HasIndex(u => u.Email)
            .IsUnique();
    }
}