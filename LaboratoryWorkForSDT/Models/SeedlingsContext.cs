using Microsoft.EntityFrameworkCore;

namespace LaboratoryWorkForSDT.Models
{
    public class SeedlingsContext : DbContext
    {
        public DbSet<Seedlings> Seedlings { get; set; }
        public SeedlingsContext(DbContextOptions<SeedlingsContext> options) : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
