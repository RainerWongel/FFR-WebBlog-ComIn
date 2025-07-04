import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root'})
export class AuthService
{
    constructor(private http: HttpClient) {}

    login(username: string, passwordHash: string): Observable<any> 
    {
        return this.http.post<{ username: string; userId: number }>('http://localhost:5072/api/ControllerUserAuthentification/Login', { username, passwordHash })
    }

    logout(): Observable<void>
    {
        return this.http.post<void>('http://localhost:5072/api/ControllerUserAuthentification/Logout', {}, { responseType: 'text' as 'json' })
    }
}