import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent 
{
  constructor(private router: Router) {}

  onRouteChange(event: Event): void 
  {
    console.log('Route wurde geändert');
    const route = (event.target as HTMLSelectElement).value;
    this.router.navigate([`/${route}`]);
  }


  // Username ändern
  boolChangeUsername = false;

  toggleChangeUsername()
  {
    this.boolChangeUsername = !this.boolChangeUsername;
  }

  username = '';
  password = '';
  newUsername = '';

  changeUsername()
  {
    const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
    const newUsername = document.getElementById('newUsername') as HTMLInputElement;
    const password = document.getElementById('passwordHash') as HTMLInputElement;

    const currentUser = localStorage.getItem('username');

    this.username = usernameInput.value;
    this.newUsername = newUsername.value;
    this.password = password.value;

    console.log(this.username);
    console.log(currentUser);

    if (!usernameInput || !newUsername || !password || !currentUser)
    {
      alert("Falsche eingaben oder nicht angemeldet");
      return;
    } 

    if (this.username != currentUser)
    {

    }
  }


  // Passwort ändern
  boolChangePassword = false;

  toggleChangePassword()
  {
    this.boolChangePassword = !this.boolChangePassword;
  }

  changePassword()
  {

  }
}
