import { Injectable, Input } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Post } from '../models/post.model';
import { PostInput } from '../models/postinput.model';
import { Category } from '../models/category.model';



@Injectable({
  providedIn: 'root'
})


export class CategoryService 
{
    constructor(private http: HttpClient) {}

    public createCategory(category: Category)
    {
        const url = `http://localhost:5072/api/ControllerCategory`;
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<Category>(url, category, { headers });
    }

    public getAllCategories(): Observable<Category[]>
    {
        return this.http.get<Category[]>(`http://localhost:5072/api/ControllerCategory`);
    }

}
