using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbSet.Classes
{
    internal class CategoryClass
    {
    }
    public class Category
    {
        [Key]
        public int Id { get; set; }     //primärschlüssel
        public string Name { get; set; }
    }
}
