using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSet.Classes
{
    internal class TagClass
    {
    }
    public class Tag
    {
        public int Id { get; set; }     //primärschlüssel
        public string Name { get; set; }
        public ICollection<PostTag> PostTags { get; set; } = new List<PostTag>();
    }
}
