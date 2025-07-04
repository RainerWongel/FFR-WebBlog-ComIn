import { AfterViewInit, Component, Input } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { CommonModule, JsonPipe } from '@angular/common';
import { signal, effect } from '@angular/core';
import { Comment } from '../models/comment.model';
import { CommentService } from '../services/comment.service';
import { CommentComponent } from "../comment/comment.component";
import { Router } from '@angular/router';
import { CategoriesComponent } from '../categories/categories.component';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Tag } from '../models/tag.model';
import { TagService } from '../services/tag.service';


@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements AfterViewInit
{
  

  ngAfterViewInit(): void {
    
  }

  usersList = signal<User[]>([]);
  postsList = signal<Post[]>([]);
  categories: Category[] = [];
  tags: Tag[] = [];

  constructor(
    private postService: PostService, 
    private commentService: CommentService, 
    private router: Router,
    private categoryService: CategoryService,
    private tagService: TagService
  ) 
  {
    this.categoryService.getAllCategories().subscribe( categories => 
      {
        this.categories = categories;
      });

    this.tagService.getAllTags().subscribe( tags =>
      {
        this.tags = tags;
      });
  }



  @Input() post! : Post;
  @Input() comment! : Comment;
  @Input() comments: Comment[] = [];

    editMode = false;

    toggleEditMode() 
    {
      this.editMode = !this.editMode;
    }

    currentUsername = localStorage.getItem('username') || '';

    startEdit()
    {
      if (!this.gehoertEntityDemUser(this.post.userId)) 
      {
        alert("⛔ Du darfst diesen Post nicht bearbeiten.");
        return;
      }

      this.toggleEditMode();
    }

    savePost() 
    {
      const titleElement = document.getElementById('postTitle-' + this.post.id);
      const contentElement = document.getElementById('postContent-' + this.post.id);

      console.log(titleElement);
      console.log(contentElement);

      if (!titleElement || !contentElement)
      {
        console.error('Inhalte konnten nicht geladen werden.')
        return;
      }
    
      this.post.title = titleElement.innerText.trim();
      this.post.content = contentElement.innerText.trim();
      
      this.postService.updatePosts(this.post).subscribe
      (
        {
        next: () => 
          {
            console.log("✅ Post wurde in der Datenbank aktualisiert");
            this.toggleEditMode();
          },
          error: (err) => 
          {
            console.error("❌ Fehler beim Speichern:", err);
          }
        }
      );
      
    }

    deletePostIfOwner(post: Post) //, postId: number
    {
      if (post.userId.toString() === localStorage.getItem('userId'))
      {
        if (!post.id)
        {
          console.error('Post Id fehlt!')
          return;
        }

        const sicher = confirm(" ❗ Willst du diesen Post wirklich löschen? ❗ ")
        if (sicher)
        {
          this.postService.deletePost(post.id).subscribe
          (
            {
              next: () => console.log("Der Post wurde gelöscht"),
              error: (err) => console.error("Fehler beim löschen", err)
            }
          );

          setTimeout(() => 
          {
            window.location.reload();
          }, 10);
          }

      }
      else
      {
        alert("⛔ Du darfst diesen Post nicht löschen.");
      }
      }

      private gehoertEntityDemUser(userId: number | string): boolean {
        return userId.toString() === localStorage.getItem('userId');
    }

    showcomments = false;

    toggleComments(postId: number)
    {
      this.showcomments = !this.showcomments;
      console.log(this.showcomments);

      this.commentService.getCommentsByPost(postId).subscribe( comments => {
        this.post.comments = comments;

      });
      
      console.log(this.comments);
    }

    createComment = false;

    toggleCreateComment(postId: number)
    {
      this.createComment = !this.createComment;
      console.log(this.createComment);

      this.commentService.getCommentsByPost(postId).subscribe();
    }


    // neuen kommentar erstellen
    postComment()
    {
      const userId = localStorage.getItem('userId');
        console.log(userId)
      
        if (!this.comment)
        {
          this.comment = {} as Comment
        }
      
        const textInput = (document.getElementById('commentText') as HTMLTextAreaElement).value;
        const userIdStrg = localStorage.getItem('userId');
        const parsedUserId = userIdStrg ? parseInt(userIdStrg) : 0;
        const usernameStrg = localStorage.getItem('username');
      
        this.comment = this.comment || {};
        this.comment.text = textInput;
        this.comment.userId = parseInt(userId!, 10);
      
        const parentCommentId = this.comment.parentCommentId !== undefined ? this.comment.parentCommentId : null;

        this.commentService.createComment
        (
          {
            text: this.comment.text,
            postId: this.post.id,
            userId: this.comment.userId,
            parentCommentId: parentCommentId
          }
        ).subscribe
        (
          {
            next: () => console.log('Neuer Kommentar wurde erstellt'),
            error: (err) => console.error('Fehler:', err.error || err.message || err, "hallo", this.comment)
          }
        )

          // andere route
            setTimeout(() => 
          {
            this.router.navigate(['']);
          }, 1000);
      
          // refresh website
          setTimeout(() => 
          {
            window.location.reload();
          }, 1000);
    }


    // um kategorienamen in metadaten anzuzeigen
    getCategoryName(id: number): string 
    {
      return this.categories.find(c => c.id === id)?.name ?? 'Unbekannt';
    }
    

    // um tagnamen in metadaten anzuzeigen
    getTagNames(id: any): string
    {
      console.log(id);
       return '';
    }



  }