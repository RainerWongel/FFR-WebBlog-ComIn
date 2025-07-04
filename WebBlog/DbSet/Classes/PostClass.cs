using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSet.Classes
{
    internal class PostClass
    {
    }

    public class Post
    {
        public int Id { get; set; }     // primärschlüssel
        public int UserId { get; set; } // 1:n weil ein user mehrere posts
        public virtual User? User { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public int CategoryId { get; set; } // 1:n beziehung weil mehere posts einer klasse zugeordnet werden können
        public virtual List<Comment>? Comments { get; set; } = new List<Comment>();
        public virtual List<PostTag> PostTags { get; set; } = new List<PostTag>();
    }
}
