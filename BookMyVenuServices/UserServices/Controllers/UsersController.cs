
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserServices.Models;
using UserServices.Repository;
using static System.Reflection.Metadata.BlobBuilder;
using UserServices.Helpers;
namespace UserServices.Controllers
{
    [Route("api/[controller]")]
    //[UsersFilter]
    //[ExcpHandlingFilter]
    public class UsersController : ControllerBase
    {
        private readonly userDbContext _context;
        private readonly ILogger<UsersController> _logger;
     
        public UsersController(userDbContext context, ILogger<UsersController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> Getusers()
        {
            
           _logger.LogInformation("Show order method called at:"+DateTime.Now.ToString()+Request.Host.ToString());
           // throw new Exception("This is a test exception for logging purposes.");
            return await _context.users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.UserID)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers([FromBody]Users users)
        {
            _context.users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.UserID }, users);
        }

       /* // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var users = await _context.users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }
*/
        private bool UsersExists(int id)
        {
            return _context.users.Any(e => e.UserID == id);
        }

         /*IuserRepository _repo;
        public UsersController(IuserRepository repo)
        {
            _repo = repo;
        }*/

    }
}
