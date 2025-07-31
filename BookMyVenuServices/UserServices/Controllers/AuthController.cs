using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UserServices.Helpers;
using UserServices.Repository;
using UserServices.Models;
namespace UserServices.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
    /*[TypeFilter(typeof(UsersFilter))]
    [ExcpHandlingFilter()]*/
    public class AuthController : ControllerBase
    {
        private readonly userDbContext _context;

        public AuthController(userDbContext context)
        {
            _context = context;
        }
        
        [HttpPost("login")]
        public IActionResult Login([FromBody]LoginRequest request)
        {
            var user = _context.users.FirstOrDefault(u => u.email == request.email);
            
            if (user != null && user.password == request.password)
            {
                //TokenResponse tr = new TokenResponse();
                var token = new TokenHelper().GenerateToken(user);
                return Ok(new TokenResponse
                {
                    Token = token,
                    Status = "success"
                }); // Login successful
                
            }
            return BadRequest(new TokenResponse
            {
                Token = null,
                Status = "error"
            }); // Login failed
        }

        [HttpPost("ForgotPassword")]
        public IActionResult ForgotPassword([FromBody] ForgotPasswordRequest request)
        {
            var user = _context.users.FirstOrDefault(u => u.email == request.email);
            if (user == null)
            {
                return BadRequest(new { status = "error", message = "Email not found" });
            }

            // In real apps, generate token and email it. Here we just simulate success.
            return Ok(new { status = "success", message = "Reset link sent (simulated)" });
        }

        [HttpPost("ResetPassword")]
        public IActionResult ResetPassword([FromBody] ResetPasswordRequest request)
        {
            var user = _context.users.FirstOrDefault(u => u.email == request.email);
            if (user == null)
            {
                return BadRequest(new { status = "error", message = "User not found" });
            }

            user.password = request.newPassword;
            user.UpdatedDate = DateTime.UtcNow;

            _context.SaveChanges();
            return Ok(new { status = "success", message = "Password reset successfully" });
        }
    }
}
