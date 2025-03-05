using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Common;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repositories;

public class GenericRepository<TEntity>(IApplicationDbContext dbContext) : IGenericRepository<TEntity> where TEntity : BaseEntity
{
    protected readonly IApplicationDbContext _dbContext = dbContext;

    public virtual async Task<TEntity?> GetByIdAsync(Guid id, bool includeInactive = false)
    {
        IQueryable<TEntity> query = _dbContext.Set<TEntity>();
        
        if (!includeInactive)
            query = query.Where(e => e.IsActive);

        return await query.FirstOrDefaultAsync(e => e.Id == id);
    }

    public virtual async Task<List<TEntity>> GetAllAsync(bool includeInactive = false)
    {
        IQueryable<TEntity> query = _dbContext.Set<TEntity>();
        
        if (!includeInactive)
            query = query.Where(e => e.IsActive);

        return await query.ToListAsync();
    }

    public virtual async Task<PagedList<TEntity>> GetPagedAsync(
        int pageNumber, 
        int pageSize,
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, 
        bool includeInactive = false,
        params Expression<Func<TEntity, object>>[] includes)
    {
        IQueryable<TEntity> query = _dbContext.Set<TEntity>();
        
        if (!includeInactive)
            query = query.Where(e => e.IsActive);

        if (filter != null)
            query = query.Where(filter);

        foreach (var include in includes)
            query = query.Include(include);

        if (orderBy != null)
            query = orderBy(query);

        return await Task.FromResult(PagedList<TEntity>.Create(query, pageNumber, pageSize));
    }

    public virtual async Task<TEntity> AddAsync(TEntity entity)
    {
        await _dbContext.Set<TEntity>().AddAsync(entity);
        await _dbContext.SaveChangesAsync(new CancellationToken());
        return entity;
    }

    public virtual async Task UpdateAsync(TEntity entity)
    {
        _dbContext.Set<TEntity>().Update(entity);
        await _dbContext.SaveChangesAsync(new CancellationToken());
    }

    public virtual async Task DeleteAsync(Guid id)
    {
        var entity = await GetByIdAsync(id, true);
        if (entity != null)
        {
            entity.IsActive = false;
            await UpdateAsync(entity);
        }
    }

    public virtual async Task HardDeleteAsync(TEntity entity)
    {
        _dbContext.Set<TEntity>().Remove(entity);
        await _dbContext.SaveChangesAsync(new CancellationToken());
    }

    public virtual async Task<bool> ExistsAsync(Guid id)
    {
        return await _dbContext.Set<TEntity>().AnyAsync(e => e.Id == id && e.IsActive);
    }

    public virtual async Task<int> CountAsync(Expression<Func<TEntity, bool>>? filter = null)
    {
        IQueryable<TEntity> query = _dbContext.Set<TEntity>().Where(e => e.IsActive);
        
        if (filter != null)
            query = query.Where(filter);

        return await query.CountAsync();
    }

    public virtual async Task<List<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate)
    {
        return await _dbContext.Set<TEntity>()
            .Where(e => e.IsActive)
            .Where(predicate)
            .ToListAsync();
    }
}