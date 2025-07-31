
/*using System.Collections.Generic;
using UserServices.Models;

namespace UserServices.Repository
{
    public class userRepository : IuserRepository
    {
        private readonly userDbContext _dbcontext;

        public userRepository(userDbContext context)
        {
            _dbcontext = context;
        }

        public Users GetUser(int userId)
        {
            return _dbcontext.GetUsers().Find(u => u.UserID == userId);
        }

        public bool AddUser(Users user)
        {
            try
            {
                _dbcontext.AddUser(user);
                return true;
            }
            catch
            {
                return false;
            }
        }

        public bool DeleteUser(int userId)
        {
            return _dbcontext.DeleteUser(userId);
        }

        public bool ModifyUser(int id, Users updatedUser)
        {
            return _dbcontext.ModifyUser(id, updatedUser);
        }

        public bool UserExists(int id)
        {
            return _dbcontext.UserExists(id);
        }

        public bool ValidateUser(Users user)
        {
            return _dbcontext.ValidateUser(user);
        }
    }
}*/

using UserServices.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using UserServices.Repository;

namespace UserServices
{
    public class userRepository : IuserRepository
    {
        userDbContext _dbcontext;
        public userRepository(userDbContext c)
        {
            _dbcontext = c;
        }
        public Users GetUser(int UserId)
        {
            var user = _dbcontext.users.Find(UserId);
            return user;
        }
        public bool AddUser(Users c)
        {
            try
            {
                c.CreatedDate = DateTime.UtcNow;
                c.UpdatedDate = DateTime.UtcNow;

                _dbcontext.users.Add(c);
                _dbcontext.SaveChanges();
            }
            catch { return false; }
            return true;
        }

        public bool DeleteUser(int UserId)
        {
            var user = _dbcontext.users.Find(UserId);
            if (user == null)
            {
                return false;
            }
            try
            {
                _dbcontext.users.Remove(user);
                _dbcontext.SaveChanges();
            }
            catch { return false; }
            return true;
        }

        public bool ModifyUser(int id, Users updatedUser)
        {
            var existingUser = _dbcontext.users.Find(id);
            if (existingUser == null)
            {
                return false;
            }

            // Update only allowed fields
            existingUser.UserName = updatedUser.UserName;
            existingUser.email = updatedUser.email;
            existingUser.password = updatedUser.password;
            existingUser.UpdatedDate = DateTime.UtcNow;

            try
            {
                _dbcontext.SaveChanges();//
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return false;
                }
                else
                {
                    throw;
                }
            }

            return true;
        }

        public bool UserExists(int id)
        {
            return _dbcontext.users.Any(e => e.UserID == id);
        }


        /* public bool ValidateUser(Users u)
         {
             Users user = _dbcontext.users.Where((us) => us.UserID == u.UserID).FirstOrDefault();
             if (user != null)
             {
                 if (user.password == u.password)
                 {
                     return true;
                 }
             }
             return false;
         }*/
       



    }
}
    

