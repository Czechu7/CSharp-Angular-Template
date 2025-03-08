using Application.Common.Models;
using Domain.Common;
using System.Linq.Expressions;

namespace Application.Common.Interfaces;

public interface IGenericRepository<TEntity> where TEntity : BaseEntity
{
    Task<TEntity?> GetByIdAsync(Guid id, bool includeInactive = false);
    Task<List<TEntity>> GetAllAsync(bool includeInactive = false);
    Task<PagedList<TEntity>> GetPagedAsync(
        int pageNumber, 
        int pageSize, 
        Expression<Func<TEntity, bool>>? filter = null,
        Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>>? orderBy = null, 
        bool includeInactive = false,
        params Expression<Func<TEntity, object>>[] includes);
    Task<TEntity> AddAsync(TEntity entity);
    Task UpdateAsync(TEntity entity);
    Task DeleteAsync(Guid id); // Soft delete - zmienia flagę IsActive na false
    Task HardDeleteAsync(TEntity entity); // Usunięcie fizyczne z bazy
    Task<bool> ExistsAsync(Guid id);
    Task<int> CountAsync(Expression<Func<TEntity, bool>>? filter = null);
    Task<List<TEntity>> FindAsync(Expression<Func<TEntity, bool>> predicate);
}