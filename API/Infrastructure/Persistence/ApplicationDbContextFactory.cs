using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Infrastructure.Persistence;
using Application.Common.Interfaces;
using Domain.Entities;

namespace API.Infrastructure.Persistence
{
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=CSharpAngularTemplateDB;Integrated Security=True");

            return new ApplicationDbContext(
                optionsBuilder.Options,
                new DateTimeService(),
                new DesignTimeCurrentUserService());
        }
    }

    public class DateTimeService : IDateTime
    {
        public DateTime Now => DateTime.Now;
    }

    public class DesignTimeCurrentUserService : ICurrentUserService
    {
        public string UserId => "00000000-0000-0000-0000-000000000000";
        public bool IsAuthenticated => false;
        // Implement the missing methods
        public Task<User?> GetCurrentUserAsync(CancellationToken cancellationToken = default)
        {

            return Task.FromResult<User?>(null);
        }
        public Task<User?> FindUserByEmailAsync(string email, bool activeOnly = true, CancellationToken cancellationToken = default)
        {
            return Task.FromResult<User?>(null);
        }

        public Task<User?> FindUserByIdAsync(string userId, bool activeOnly = true, CancellationToken cancellationToken = default)
        {
            return Task.FromResult<User?>(null);

        }
        public Task<bool> ExistsUserWithEmailOrUsernameAsync(string email, string username, CancellationToken cancellationToken = default)
        {
            return Task.FromResult<bool>(false);
        }

    }
}