import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent 
{
  username = '';
  passwordHash = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin()
  {
    console.log("login wurde gedrückt");

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordHashInput = document.getElementById('passwordHash') as HTMLInputElement;

    this.username = usernameInput.value;
    this.passwordHash = passwordHashInput.value;

// HIER WEITER MACHEN ERST GET USERS SERVICE MACHEN DANN HIER ABFRAGEN OB ES DEN EINGEGEBENEN USERNAME GIBT UND DAS PASSWORT DAZU ABFRAGEN DAMIT ENTSPRECHENDE FEHLERMELDUNG
// weiß nichtmehr was ich hier geschrieben habe aber evtl gibt es irgendein Problem xD

    this.authService.login(this.username, this.passwordHash).subscribe(response => {
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('username', response.username);
      localStorage.setItem('LogInStatus', 'true');
      console.log(response.userId)
      console.log(response.username)
      console.log('Login erfolgreich', response);
    }, error => {
      console.error('Login fehlgeschlagen', error)
      alert('Falsches Passwort oder falscher Username')
    });

    const loginForm = document.getElementById('loginForm') as HTMLFormElement;

    loginForm.addEventListener('submit', (event: Event) => 
    {
      event.preventDefault()
    });

    //nach login zurück zur Startseite navigieren
    setTimeout(() => 
    {
      this.router.navigate(['']);
    }, 1000);

    //Seite neu laden damit rechts oben "Angemeldet als: ..." und links unten Logout-Button richtig aktualisiert werden
    setTimeout(() => 
    {
      window.location.reload();
    }, 1000);
    
  }


}