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

    public class ControllerComment(BlogDbContext context) : ControllerBase
    {
        //Create
        [HttpPost]
        public async Task<IActionResult> CreateComment([FromBody] Comment comment)
        {
            //var userIdraw = User.FindFirst("UserID")?.Value;
            Console.WriteLine($"➡️ Text: {comment?.Text}, PostId: {comment?.PostId}, UserId: {comment?.UserId}, Parent: {comment?.ParentCommentId}");

            if (!ModelState.IsValid)
            {
                Console.WriteLine("❌ ModelState ungültig");
                foreach (var kvp in ModelState)
                    foreach (var err in kvp.Value.Errors)
                        Console.WriteLine($"→ {kvp.Key}: {err.ErrorMessage}");

                return BadRequest(ModelState);
            }

            if (comment == null || string.IsNullOrWhiteSpace(comment.Text) || comment.PostId <= 0)
            {
                return BadRequest("Invalid comment data");
            }

            Post post = await context.Posts.FindAsync(comment.PostId);
            if (post == null)
            {
                return NotFound("Post not found.");
            }


            var userId = await context.Users.FindAsync(comment.UserId);
            if (userId == null)
            {
                return Unauthorized("User cannot get identified");
            }

            if (comment.ParentCommentId != null)
            {
                var parentComment = await context.Comments.FindAsync(comment.ParentCommentId);
                if (parentComment == null)
                {
                    return BadRequest("Parent comment not found");
                }
                comment.ParentComment = parentComment;
            }

            //comment.UserId = int.Parse(userIdraw);

            context.Comments.Add(comment);
            await context.SaveChangesAsync();
            return Ok(comment);
        }

        //[HttpPost("post/{post.id}/comment")]
        //public async Task<IActionResult> CreateCommentReply(int parentId, [FromBody] Comment reply)
        //{
        //    var parent = await context.Comments.FindAsync(parentId);
        //    if (parent == null) return NotFound();

        //    reply.PostId = parent.PostId;
        //    reply.ParentCommentId = parentId;

        //    context.Comments.Add(reply);
        //    await context.SaveChangesAsync();
        //    return Ok(reply);
        //}

        //Read
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetAllComments()
        {
            var comments = context.Comments.Include(comment => comment.User).ToArray();
            return Ok(comments);
        }

        [HttpGet("post/{postId}/comments")]
        public async Task<IActionResult> GetCommentsForPost(int postId)
        {
            var comments = await context.Comments
                .Include(c => c.User)
                .Include(c => c.Replies)
                .Where(c => c.PostId == postId && c.ParentCommentId == null)
                .ToArrayAsync();

            //var comments = await context.Comments
            //    .Where(c => c.PostId == postId)
            //    .ToArrayAsync();

            return Ok(comments);
        }

        [HttpGet("byComment/{commentId}")]
        public async Task<IActionResult> GetRepliesByComment(int commentId)
        {
            var replies = await context.Comments
                .Include(c => c.User)
                //.Include(c => c.Replies) // Optional: weitere verschachtelung
                .Where(c => c.ParentCommentId == commentId)
                .ToArrayAsync();

            return Ok(replies);
        }

        //Update
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(int id, [FromBody] Comment comment)
        {
            Comment existingComment = await context.Comments.FindAsync(id);
            if (existingComment == null)
            {
                return BadRequest("No comment found with this ID.");
            }

            existingComment.Text = comment.Text;
            await context.SaveChangesAsync();
            return Ok(existingComment);
        }

        //Delete
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            var comment = await context.Comments.FindAsync(id);
            if (comment == null)
            {
                return NotFound();
            }

            context.Comments.Remove(comment);
            await context.SaveChangesAsync();
            return NoContent();
        }

    }
}
