using DbSet.Classes;
using Microsoft.EntityFrameworkCore;

namespace DbSet
{


    public class BlogDbContext : DbContext
    {
        public BlogDbContext(DbContextOptions<BlogDbContext> options) : base(options) { }

        public DbSet<Post> Posts { get; set; }
        public DbSet<PostTag> PostTags { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Category> Categories { get; set; }
        //public DbSet<Like> Likes { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            // Konfiguration für Like (zusammengesetzter Schlüssel) (1:n)

            //modelBuilder.Entity<Like>()
            //    .HasKey(l => new { l.UserId, l.PostId }); // zusammengesetzter schlüssel aus userid und postid wird erstellt

            //modelBuilder.Entity<Like>()
            //    .HasOne(l => l.User)            // ein like gehört zu einem benutzer
            //    .WithMany()                     // ein benutzer kann viele likes vergeben
            //    .HasForeignKey(l => l.UserId);  // userID ist der fremdschlüssel

            //modelBuilder.Entity<Like>()
            //    .HasOne(l => l.Post)            // ein like gehört zu einem post
            //    .WithMany()                     // ein post kann viele likes haben
            //    .HasForeignKey(l => l.PostId);  // postId ist der fremdschlüssel


            // KONFIGURATION FÜR MANY TO MANY ZWISCHEN POST UND TAG

            modelBuilder.Entity<PostTag>()
                .HasKey(pt => new { pt.PostId, pt.TagId });

            modelBuilder.Entity<PostTag>()
                .HasOne(pt => pt.Post)
                .WithMany(pt => pt.PostTags)
                .HasForeignKey(pt => pt.PostId);

            modelBuilder.Entity<PostTag>()
                .HasOne(pt => pt.Tag)
                .WithMany(pt => pt.PostTags)
                .HasForeignKey(pt => pt.TagId);


            //Post->Category (One to Many, 1:n)
            modelBuilder.Entity<Post>()
                .HasOne<Category>()            // ein post gehört zu einer kategorie
                .WithMany()                         // eine kategorie hat mehrere posts
                .HasForeignKey(p => p.CategoryId);  // categoryId fk in post tabelle 


            //User->Post(One to Many, 1:n)
            modelBuilder.Entity<Post>()
                .HasOne(p => p.User)              // ein post hat genau einen autor (User)
                .WithMany()                         // ein user kann mehrere posts haben
                .HasForeignKey(p => p.UserId);      // UserId == Author, bloß anderen namen gegeben für besseres verständniss

            //Post->Comment(One to Many, 1:n)
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.PostId);


            //User -> Comment (One to Many, 1:n)
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.User)
                .WithMany()
                .HasForeignKey(c => c.UserId);

        }
    }
}
