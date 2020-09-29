using System;
using Domain;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {            
        }

        public DbSet<Valeu> Values {get; set;}

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Valeu>()
                .HasData(
                    new Valeu {Id = 1, name = "Valeu 101"},
                    new Valeu {Id = 2, name = "Valeu 102"},
                    new Valeu {Id = 3, name = "Valeu 103"}

                );
            
        }
    }
}
