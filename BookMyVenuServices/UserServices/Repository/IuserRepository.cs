using UserServices.Models;

namespace UserServices
{
    public interface IuserRepository
    {
        bool AddUser(Users c);
        bool DeleteUser(int UserId);
        Users GetUser(int UserId);
        bool ModifyUser(int id, Users updatedUser);
        bool UserExists(int id);
        //bool ValidateUser(Users u);
    }
}