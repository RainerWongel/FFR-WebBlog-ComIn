import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})


export class CommentService 
{

  http = inject(HttpClient);

  public getComments(): Observable<Comment[]>
  {
    return this.http.get<Comment[]>(`http://localhost:5072/api/ControllerComment`);   //, {headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
  }



  public updateComment(comment: Comment): Observable<Comment>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:5072/api/ControllerComment/${comment.id}`;
    
    return this.http.put<Comment>(url, comment, { headers });
  }


  
  public deleteComment(id: number): Observable<void>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:5072/api/ControllerComment/${id}`;

    return this.http.delete<void>(url, { headers });
  }

  public createComment(comment: { text: string; postId: number, userId: number, parentCommentId?: number | null})
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:5072/api/ControllerComment`;
    
    return this.http.post<Comment>(url, comment, { headers })
  }

  // public getCommentsbyPost(post.id).subscribe(comments => {
  //   console.log("Kommentare geladen:" comments);
  //   console.log("Anzahl:" comments.length);
  // });

  public getCommentsByPost(postId: number): Observable<Comment[]> 
  {
    return this.http.get<Comment[]>(`http://localhost:5072/api/ControllerComment/post/${postId}/comments`)
    .pipe(tap(comments => {
      console.log(`${comments.length} kommentare für post ${postId}`, comments);
    }))
  }

  getRepliesByComment(commentId: number): Observable<Comment[]>
  {
    return this.http.get<Comment[]>(`http://localhost:5072/api/ControllerComment/byComment/${commentId}`)
  }

  createReply(reply: {text: string; postId: number; userId: number; parentCommentId: number;})
  {
    return this.createComment(reply);
  }
}