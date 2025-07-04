using DbSet;
using DbSet.Classes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebBlog.DTOs;

namespace WebBlog.Controllers
{
    //[Authorize]
    [ApiController]
    [Route("api/[controller]")]

    public class ControllerPost(BlogDbContext context) : ControllerBase
    {
        //CREATE
        //[HttpPost]

        //[AllowAnonymous]
        //public async Task<IActionResult> CreatePost([FromBody] Post post)
        //{
        //    //--------------------------------------------------------------------------

        //    //foreach (var claim in User.Claims)
        //    //{
        //    //    Console.WriteLine($"{claim.Type} : {claim.Value}");
        //    //}

        //    //int userIdraw = int.Parse(User.FindFirst("UserId")?.Value);

        //    //if (userIdraw == null)
        //    //{
        //    //    return Unauthorized("User cannot get identified.");
        //    //}
        //    //else
        //    //{
        //    //    post.UserId = userIdraw;
        //    //}

        //    //--------------------------------------------------------------------------


        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var categoryExists = await context.Categories.AnyAsync(c => c.Id == post.CategoryId);
        //    if (!categoryExists)
        //    {
        //        return BadRequest(new { error = "Category does not exist" });
        //    }

        //    context.Posts.Add(post);
        //    await context.SaveChangesAsync();

        //    foreach (var pt in post.PostTags)
        //    {
        //        context.PostTags.Add(new PostTag
        //        {
        //            PostId = post.Id,
        //            TagId = pt.TagId
        //        });
        //    }
        //    await context.SaveChangesAsync();
        //    return Ok(post);


        //}

        [HttpPost]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDTO dto) 
        {
            var post = new Post
            {
                Title = dto.Title,
                Content = dto.Content,
                UserId = 6,
                PostTags = dto.TagIds.Select(tagId => new PostTag
                {
                    TagId = tagId
                }).ToList(),
                CategoryId = dto.CategoryId
            };

            context.Posts.Add(post);

            Console.WriteLine($"UserId: {post.UserId}");
                
            await context.SaveChangesAsync();
            return Ok(post);
        }

        //READ
        [AllowAnonymous]
        [HttpGet]
        public IActionResult GetAllPosts()
        {
            //var posts = context.Posts.Include(post => post.User).Include(post => post.Comments).ToArray();
        
            var posts = context.Posts
                .Include(p => p.PostTags)
                    .ThenInclude(pt => pt.Tag)
                .Include(p => p.User)
                .Include(p => p.Comments)
                .ToArray();

                
            return Ok(posts);
        }

        [HttpGet("by-category/{categoryId}")]
        public async  Task<IActionResult> GetPostByCategory(int categoryId)
        {
            var posts = await context.Posts
                .Where(p => p.CategoryId == categoryId)
                .ToArrayAsync();

            return Ok(posts);
        }

        [HttpGet("posts")]
        public async Task<IActionResult> GetPagedPosts(int page = 1, int pagesize = 10, int? categoryId = null)
        {

            IQueryable<Post> query = context.Posts.Include(p => p.User);

            if (categoryId.HasValue)
            {
                query = query.Where(p => p.CategoryId == categoryId.Value);
            }

            //var totalPosts = await context.Posts.CountAsync();
            var totalPosts = await query.CountAsync();
            //var posts = await context.Posts
            var posts = await query
                .Skip((page - 1) * pagesize)
              //  .Include(p => p.User);
                .Include(p => p.PostTags)
                        .ThenInclude(pt => pt.Tag)
                .Take(pagesize)
                .ToListAsync();

            return Ok(new
            {
                Data = posts,
                CurrentPage = page,
                TotalPages = (int)Math.Ceiling(totalPosts / (double)pagesize)
            });
        }


        //UPDATE
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePost(int id, [FromBody] Post post)
        {
            Post existingPost = await context.Posts.FindAsync(id);
            if (existingPost == null)
            {
                return NotFound();
            }

            existingPost.Title = post.Title;
            existingPost.Content = post.Content;
            await context.SaveChangesAsync();
            return Ok(existingPost);
        }

        //DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePosts(int id)
        {
            var post = await context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            context.Posts.Remove(post);
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}
