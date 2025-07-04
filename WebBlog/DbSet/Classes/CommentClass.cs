using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace DbSet.Classes
{
    internal class CommentClass
    {
    }
    public class Comment
    {
        public int Id { get; set; }         // primärschlüssel
        public string Text { get; set; }
        public int UserId { get; set; }
        public virtual User? User { get; set; }
        public int PostId { get; set; }
        [JsonIgnore]
        public Post? Post { get; set; } 


        public int? ParentCommentId { get; set; }
        public virtual Comment? ParentComment { get; set; }

        //[Required]
        public virtual ICollection<Comment> Replies { get; set; } = new List<Comment>();
    }
}
