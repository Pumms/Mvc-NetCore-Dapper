using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApplication.Models;

namespace WebApplication.Context
{
    public class MyContext : DbContext
    {
        public MyContext(DbContextOptions<MyContext> options) : base(options)
        {
        }
        public DbSet<Mahasiswa> Mahasiswas { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Mahasiswa>()
                .HasIndex(u => u.NPM)
                .IsUnique();
        }
    }
}
