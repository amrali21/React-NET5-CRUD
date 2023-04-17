using CRUD_Design.Repository;
using Microsoft.EntityFrameworkCore;

namespace CRUD_Design
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<User> Users{ get; set; }
        public DbSet<Memo> Memos{ get; set; }

    }
}
