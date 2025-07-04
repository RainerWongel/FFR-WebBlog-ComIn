using DbSet;
using DbSet.Classes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebBlog.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]


    public class ControllerCategory(BlogDbContext context) : ControllerBase // kurze und nice schreibweise vom konstruktor, blogdbcontext context = direkte verbindung zur datenbank
    {
        //public CRUDControllerCategory(BlogDbContext context)
        //{
                                                                           //lange und dumme schreibweise vom Konstruktor
        //    _context = context;
        //}

        //Create
        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromBody] Category category)
        {
            //if (category == null || string.IsNullOrWhiteSpace(category.Name) || category.PostId <= 0)
            //{
            //    return BadRequest("Invalid category data");
            //}

            //Post post = await context.Posts.FindAsync(category.PostId);
            //if (post == null)
            //{
            //    return NotFound("Post not found.");
            //}
            context.Categories.Add(category);
            await context.SaveChangesAsync();
            return Ok(category);
        }

        //Read
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllCategories()
        {
            var categories = await context.Categories.ToListAsync();
            return Ok(categories);
        }

        //Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, [FromBody] Category category)
        {
            Category existingCategory = await context.Categories.FindAsync(id);
            if (existingCategory == null)
            {
                return NotFound();
            }

            existingCategory.Name = category.Name;
            await context.SaveChangesAsync();
            return Ok(existingCategory);
        }

        //Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            context.Categories.Remove(category);
            await context.SaveChangesAsync();
            return NoContent();
        }
    }
}
