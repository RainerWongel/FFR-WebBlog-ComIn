import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/administration.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent 
{
  username = '';
  passwordHash = '';
  submitPassword = '';

  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) {}

  onRegistration()
  {
    console.log("register wurde gedrückt");

    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordHashInput = document.getElementById('passwordHash') as HTMLInputElement;
    const submitPasswordHashInput = document.getElementById('submitPassword') as HTMLInputElement;

    this.username = usernameInput.value;
    this.passwordHash = passwordHashInput.value;
    this.submitPassword = submitPasswordHashInput.value;

    if (this.passwordHash != this.submitPassword)
    {
      alert ('Die Passwörter stimmen nicht überein!')
      return;
    }

    this.adminService.createAccount(this.username, this.passwordHash).subscribe({
      next: res => alert('Account erfolgreich erstellt!'),
      error: err => alert(`Fehler: ${err.error}`)
    });



    setTimeout(() => 
    {
      this.router.navigate(['']);
    }, 1000);


    setTimeout(() => 
    {
      window.location.reload();
    }, 1000);
    
  }
}
