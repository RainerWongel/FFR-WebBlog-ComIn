import { Component, Input } from '@angular/core';
import { Comment } from '../models/comment.model';
import { Post } from '../models/post.model';
import { CommentService } from '../services/comment.service';
import { PostService } from '../services/post.service';
import { HttpClient } from '@angular/common/http';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss'
})
export class CommentComponent 
{
  @Input() comment!: Comment;
  @Input() level: number = 0;
  @Input() allComments: Comment[] = [];

  get replies(): Comment[] 
  {
    return this.allComments.filter(c => c.parentCommentId === this.comment.id);
  }


  constructor(private postService: PostService, private commentService: CommentService) {}



  editMode = false;

  toggleEditMode()
  {
    this.editMode = !this.editMode;
  }

  currentUsername = localStorage.getItem('username');
  currentUserId = localStorage.getItem('userId');


  // Kommentar löschen, aber nur wenn durch im LocalStorage gespeicherte UserId Schreibrechte verifiziert wurden
  deleteCommentIfOwner(comment: Comment)
    {
      const userId = localStorage.getItem('userId');

      // if (comment.user?.userid.toString() === userId)

      console.log(comment.user?.id);
      console.log(userId)
      if ((comment.user?.id?.toString() ?? "") === userId)
      {
        if (!comment.id)
        {
          console.error('Kommentar Id fehlt!')
          return;
        }

        const sicher = confirm(" ❗ Willst du diesen Kommentar wirklich löschen? ❗ ")
        if (sicher)
        {
          this.commentService.deleteComment(comment.id).subscribe
          (
            {
              next: () => console.log("Der Kommentar wurde gelöscht"),
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
        alert("⛔ Du darfst diesen Kommentar nicht löschen.");
      }
      }

      private gehoertEntityDemUser(userId: number | string): boolean {
      return userId === localStorage.getItem('userId');
    }

    // Bearbeiten eines Kommentars
    startEdit()
    {
      console.log(this.currentUsername);
      console.log(this.currentUserId);

      console.log("comment editing started....")
      this.toggleEditMode(); // wenn toggleEditMode = true, dann ist der "Bearbeitunsmodus" aktiviert
    }

    // bearbeiteten Kommentar speichern
    saveComment() 
    {
      console.log("comment edit saved")
      const contentElement = document.getElementById('commentText-' + this.comment.id);

      console.log(contentElement);

      // Absicherung dass der Inhalt des Kommentars nicht leer ist
      if (!contentElement)
      {
        console.error('Inhalte konnten nicht geladen werden.')
        return;
      }
    
      this.comment.text = contentElement.innerText.trim();
      
      this.commentService.updateComment(this.comment).subscribe
      (
        {
        next: () => 
          {
            console.log("✅ Kommentar wurde in der Datenbank aktualisiert");
            this.toggleEditMode();
          },
          error: (err) => 
          {
            console.error("❌ Fehler beim Speichern:", err);
          }
        }
      );
      
    }


    // Kommentar kommentieren bzw Reply schreiben
    absendeAntwort(commentId: number) {

      const textarea = document.getElementById('antwort-textarea-' + commentId) as HTMLTextAreaElement;
      const text = textarea?.value.trim();
    
      if (!text) return; // Keine Antwort, wenn das Textfeld leer ist
    
      const userId = parseInt(localStorage.getItem('userId') ?? '0');
      const neuerKommentar = {
        text: text,
        postId: this.comment.postId,
        userId: userId,
        parentCommentId: commentId  // Die ID des übergeordneten Kommentars (auf den geantwortet wird)
      };

      console.log(this.comment.text);
      console.log(text);
      console.log('hallo')

      if (this.comment.text == text)
      {
        return;
      }
    
      // Kommentar mit der Antwort erstellen
      this.commentService.createReply(neuerKommentar).subscribe(() => {});

      

      setTimeout(() => 
      {
        window.location.reload();
      }, 1000);
    }

    AnswerCommentField = false;


    // toggle für Reply-Feld
    toggleAnswerComment(commentId: number)
    {
      this.AnswerCommentField = !this.AnswerCommentField;

      this.commentService.getCommentsByPost

      const antwortContainer = document.getElementById('antwortfeld-' + commentId);

      if (antwortContainer) 
      {
        antwortContainer.style.display = antwortContainer.style.display === 'none' ? 'block' : 'none';
      }

  }
}

  
