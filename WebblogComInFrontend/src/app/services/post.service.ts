import { Injectable, Input } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostInput } from '../models/postinput.model';
import { CategoryService } from './category.service';


@Injectable({
  providedIn: 'root'
})


export class PostService 
{
  @Input() post!: Post;

  http = inject(HttpClient);

  

  public getPosts(): Observable<Post[]>
  {
    return this.http.get<Post[]>(`http://localhost:5072/api/ControllerPost`);   //, {headers: new HttpHeaders({ 'Content-Type': 'application/json'})}
  }



  public updatePosts(post: Post): Observable<Post>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:5072/api/ControllerPost/${post.id}`;
    
    return this.http.put<Post>(url, post, { headers });
  }


  
  public deletePost(id: number): Observable<void>
  {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:5072/api/ControllerPost/${id}`;

    return this.http.delete<void>(url, { headers });
  }

  public createPost(post: PostInput)
  {

    console.log("was wird mitgeschickt:", this.post);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `http://localhost:5072/api/ControllerPost`;
    
    return this.http.post<Post>(url, post, { withCredentials: true, headers })
  }
  
  public getPostsByCategory(categoryId: number): Observable<Post[]>
  {
    return this.http.get<Post[]>(`http://localhost:5072/api/posts/by-category/${categoryId}`)
  }

  public getPagedPosts(page: number, pageSize: number): Observable<{data: Post[], currentPage: number, totalPages: number}>
  {
    return this.http.get<{ data: Post[], currentPage: number, totalPages: number}>
    (`http://localhost:5072/api/ControllerPost/posts?page=${page}&pagesize=${pageSize}`);
  }
}