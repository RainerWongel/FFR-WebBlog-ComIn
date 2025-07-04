using DbSet;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DbSet.Classes;
using Microsoft.AspNetCore.Authorization;

namespace WebBlog.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class ControllerTag(BlogDbContext context) : ControllerBase
    {
        //Create
        [HttpPost]
        public async Task<IActionResult> CreateTag([FromBody] Tag tag)
        {
            context.Tags.Add(tag);
            await context.SaveChangesAsync();
            return Ok(tag);
        }

        //Read
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllTags()
        {
            var tags = await context.Tags.ToListAsync();
            return Ok(tags);
        }

        //Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTag(int id,[FromBody] Tag tag)
        {
            Tag existingTag = await context.Tags.FindAsync(id);
            if (existingTag == null)
            {
                return BadRequest("Tag doesn't exist.");
            }


            existingTag.Name = tag.Name;
            await context.SaveChangesAsync();
            return Ok(existingTag );

        }

        //Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag(int id)
        {
            var tag = await context.Tags.FindAsync(id);
            if (tag == null)
            {
                return NotFound();
            }

            context.Tags.Remove(tag);
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}
