using Application.Common.Interfaces;
using Domain.Common;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using System.Reflection;

namespace Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    
    private readonly IDateTime _dateTime;
    private readonly ICurrentUserService _currentUserService;
    private IDbContextTransaction? _currentTransaction;

    public ApplicationDbContext(
        DbContextOptions<ApplicationDbContext> options,
        IDateTime dateTime,
        ICurrentUserService currentUserService) : base(options)
    {
        _dateTime = dateTime;
        _currentUserService = currentUserService;
    }

    public DbSet<User> Users => Set<User>();
    
    
    
    public bool HasActiveTransaction => _currentTransaction != null;
    
    public DbContext DbContext => this;
    
    public async Task<IDbContextTransaction> BeginTransactionAsync()
    {
        if (_currentTransaction != null)
        {
            return _currentTransaction;
        }

        _currentTransaction = await Database.BeginTransactionAsync();

        return _currentTransaction;
    }

    public async Task CommitTransactionAsync(IDbContextTransaction transaction)
    {
        if (transaction == null) throw new ArgumentNullException(nameof(transaction));
        if (transaction != _currentTransaction) throw new InvalidOperationException($"Transaction {transaction.TransactionId} is not current");

        try
        {
            await SaveChangesAsync();
            await transaction.CommitAsync();
        }
        finally
        {
            if (_currentTransaction != null)
            {
                await _currentTransaction.DisposeAsync();
                _currentTransaction = null;
            }
        }
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries<BaseEntity>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedBy = _currentUserService.UserId;
                    entry.Entity.CreatedAt = _dateTime.Now;
                    break;
                case EntityState.Modified:
                    entry.Entity.ModifiedBy = _currentUserService.UserId;
                    entry.Entity.ModifiedAt = _dateTime.Now;
                    break;
            }
        }

        return await base.SaveChangesAsync(cancellationToken);
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

        base.OnModelCreating(builder);
    }
     DbSet<TEntity> IApplicationDbContext.Set<TEntity>() => base.Set<TEntity>();
}