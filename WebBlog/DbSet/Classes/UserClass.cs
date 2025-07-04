using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace DbSet.Classes
{
    internal class UserClass
    {
    }
    public class User
    {
        public int Id { get; set; }             // primärschlüssel
        public string Username { get; set; }
        //public List<Comment> Comments { get; set; } //navigationsbeziehung zu comment
        public string PasswordHash { get; set; }

        [NotMapped]
        public string? NewPassword { get; set; }

    }
}
