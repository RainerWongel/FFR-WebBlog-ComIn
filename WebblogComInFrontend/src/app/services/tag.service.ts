import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tag } from '../models/tag.model';


@Injectable({ providedIn: 'root'})
export class TagService
{
    constructor(private http: HttpClient) {}

     public createTag(tag: Tag)
     {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `http://localhost:5072/api/ControllerTag`;

        return this.http.post<Tag>(url, tag, { headers });
     }

     public getAllTags(): Observable<Tag[]>
     {
        return this.http.get<Tag[]>(`http://localhost:5072/api/ControllerTag`);
     }


}