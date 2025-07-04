using DbSet;
using Microsoft.AspNetCore.Mvc;
using DbSet.Classes;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;

namespace WebBlog.Controllers
{

    [ApiController]
    [Route("api/[controller]")]

    public class ControllerUserAuthentification(BlogDbContext context) : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            var existingUser = await context.Users.SingleOrDefaultAsync(u => u.Username == user.Username);
            var existingUserId = await context.Users.SingleOrDefaultAsync(u => u.Id == user.Id);

            bool isPwCorrect = BCrypt.Net.BCrypt.Verify(user.PasswordHash, existingUser.PasswordHash);
            {
                if (!isPwCorrect || existingUser == null)
                {
                    return BadRequest("Invalid password or username");
                }
            }

            //login erfolgreich, cookies setzen

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, existingUser.Username),
                new Claim("UserId", existingUser.Id.ToString())
            };

            var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true, // cookie bleibt über sitzungen hinweg gültig
                ExpiresUtc = DateTimeOffset.UtcNow.AddHours(1)
            };

            await HttpContext.SignInAsync
                (
                 CookieAuthenticationDefaults.AuthenticationScheme,
                 new ClaimsPrincipal(claimsIdentity),
                 authProperties
                );

            return Ok(new { username = existingUser.Username, userId = existingUser.Id, message = "Login erfolgreich" });
        }
        //[Authorize]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok("Logout successful");
        }
    }
}
