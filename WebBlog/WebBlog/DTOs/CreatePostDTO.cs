namespace WebBlog.DTOs
{
    public class CreatePostDTO
    {
        public string Title { get; set; }
        public string Content { get; set; }

        public int CategoryId { get; set; }
        public List<int> TagIds { get; set; } = new();
    }
}
