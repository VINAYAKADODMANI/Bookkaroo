
using System;
using System.Collections.Generic;
using System.Linq;
using UserServices.Models;
using Microsoft.EntityFrameworkCore;

namespace UserServices.Repository
{
    public class userDbContext :DbContext
    {
        public DbSet<Users> users { get; set; }
        public userDbContext(DbContextOptions<userDbContext> options) :base(options)
        { }

         

    }
}
