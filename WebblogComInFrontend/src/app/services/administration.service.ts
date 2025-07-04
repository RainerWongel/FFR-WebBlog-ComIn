import { HttpClient } from "@angular/common/http";
import { Injectable, Input } from "@angular/core";
import { Observable } from "rxjs";
import { Register } from "../models/admin.model";


@Injectable({ providedIn: 'root'})
export class AdminService
{
    constructor(private http: HttpClient) {}

    createAccount(username: string, passwordHash: string): Observable<any> 
    {
        return this.http.post(`http://localhost:5072/api/ControllerUserAdministration/Register`, { username, passwordHash })
    }

    deleteAccount(username: string, password: string): Observable<void>
    {
        const body = {username: username, passwordHash: password};

        return this.http.delete<void>(`http://localhost:5072/api/ControllerUserAdministration/${username}`, {body: body});
    }
}