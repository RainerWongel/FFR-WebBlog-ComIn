using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DbSet.Classes;
using DbSet;
using Microsoft.AspNetCore.Authorization;
using System.Text.RegularExpressions;

namespace WebBlog.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class ControllerUserAdministration(BlogDbContext context) : ControllerBase
    {
        //Create
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            string hashedPw = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            User newuser = new User
            {
                Username = user.Username,
                PasswordHash = hashedPw
            };

            var usernameExists = await context.Users.AnyAsync(u => u.Username == newuser.Username);

            if (usernameExists)
            {
                return BadRequest("Username already in use, please pick another one.");
            }

            if (!Regex.IsMatch(newuser.Username, "^[a-zA-Z0-9]+$"))
            {
                return BadRequest("Only Chars and Numbers are allowed in Username");
            }

            context.Users.Add(newuser);
            await context.SaveChangesAsync();
            return Ok(newuser);
        }

        //Read
        //[AllowAdmin]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            List<User> user = await context.Users.ToListAsync();
            return Ok(user);
        }
        
        //Update Username
        [HttpPut("{id}/change-username")]
        public async Task<IActionResult> ChangeUsername(int id, [FromBody] User user)
        {
            User existingUser = await context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return BadRequest("User not found.");
            }

            bool isPwCorrect = BCrypt.Net.BCrypt.Verify(user.PasswordHash, existingUser.PasswordHash);
            {
                if (!isPwCorrect)
                {
                    return BadRequest("Invalid Password.");
                }
            }

            existingUser.Username = user.Username;
            await context.SaveChangesAsync();
            return Ok("Username succesfully changed.");
        }

        [HttpPut("{id}/change-password")]
        public async Task<IActionResult> ChangeUserPassword(int id, [FromBody] User user)
        {
            User existingUser = await context.Users.FindAsync(id);
            if (existingUser == null)
            {
                return BadRequest("User not found.");
            }

            bool isPwCorrect = BCrypt.Net.BCrypt.Verify(user.PasswordHash, existingUser.PasswordHash);
            {
                if (!isPwCorrect)
                {
                    return BadRequest("Invalid Password.");
                }
            }

            existingUser.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.NewPassword);
            await context.SaveChangesAsync();
            return Ok("Password succesfully changed.");
        }

        //Delete
        [HttpDelete("{username}")]
        public async Task<IActionResult> DeleteUser(string username, [FromBody] User user)
        {
            var idByUsername = await context.Users
                .Where(u => u.Username == username)
                .Select(u => u.Id)
                .FirstOrDefaultAsync();

            Console.WriteLine(idByUsername);

            User existingUser = await context.Users.FindAsync(idByUsername);
            if (existingUser == null)
            {
                return BadRequest("User not found");
            }

            bool isPwCorrect = BCrypt.Net.BCrypt.Verify(user.PasswordHash, existingUser.PasswordHash);
            {
                if (!isPwCorrect)
                {
                    return BadRequest("Invalid Password.");
                }
            }

            context.Users.Remove(existingUser);
            await context.SaveChangesAsync();
            return NoContent();

        }
        
    }
}
