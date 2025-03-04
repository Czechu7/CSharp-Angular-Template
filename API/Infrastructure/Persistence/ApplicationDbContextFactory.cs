using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using API.Infrastructure.Persistence;
using Infrastructure.Persistence;
using Application.Common.Interfaces;

namespace API.Infrastructure.Persistence
{
    /// <summary>
    /// Fabryka kontekstu bazy danych, używana głównie podczas migracji.
    /// </summary>
    public class ApplicationDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
    {
        public ApplicationDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<ApplicationDbContext>();

            optionsBuilder.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=MyDatabase;Integrated Security=True");

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
    }
}