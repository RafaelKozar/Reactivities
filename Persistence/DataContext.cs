using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {            
        }

        public DbSet<Valeu> Values {get; set;}
        public DbSet<Domain.Activity> Activities { get; set; }
      
    }
}
