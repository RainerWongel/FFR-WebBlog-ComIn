import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../services/administration.service';

@Component({
  selector: 'app-delete-account',
  standalone: true,
  imports: [],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.scss'
})
export class DeleteAccountComponent 
{
  username = '';
  passwordHash = '';
  submitPassword = '';

  constructor(private authService: AuthService, private router: Router, private adminService: AdminService) {}


  // Account löschen
  onAccountDelete()
  {
    console.log("löschen wurde gedrückt");

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

    alert('❗❗❗ Willst du diesen Account wirklich löschen? Diese Entscheidung ist unwiderruflich! ❗❗❗')

    this.adminService.deleteAccount(this.username, this.passwordHash).subscribe({
      next: res => alert('Account wurde gelöscht!'),
      error: err => alert(`Fehler: ${err.error}`)
    });



    // setTimeout(() => 
    // {
    //   this.router.navigate(['']);
    // }, 1000);


    // setTimeout(() => 
    // {
    //   window.location.reload();
    // }, 1000);
    
  }
}
