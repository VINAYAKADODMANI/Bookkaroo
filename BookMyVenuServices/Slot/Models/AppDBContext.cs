using Microsoft.AspNetCore.Components.Server.ProtectedBrowserStorage;
using Microsoft.EntityFrameworkCore;
using System;

namespace Slot.Models
{
    public class AppDBContext:DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options) { }

        public DbSet<SlotTemp> SlotTemp { get; set; }
        public DbSet<Slots> slots { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SlotTemp>(st =>
            {
                st.ToTable(tb => { tb.HasTrigger("createslot"); });
            });
        }
    }
}
