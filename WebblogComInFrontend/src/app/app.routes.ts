import { Routes } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { CreatePostComponent } from './createpost/createpost.component';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { SettingsComponent } from './settings/settings.component';
import { RegisterComponent } from './register/register.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';

export const routes: Routes = [
    { path: '', redirectTo: '/posts', pathMatch: 'full'},
    { path: 'posts', component: PostsComponent},
    { path: 'createPost', component: CreatePostComponent},
    { path: 'login', component: LoginComponent},
    { path: 'posts/kategorie/:id', component: PostComponent},
    { path: 'settings', component: SettingsComponent},
    { path: 'register', component: RegisterComponent},
    { path: 'deleteAccount', component: DeleteAccountComponent}
];

/* Erklärung Routen:

path: 'xy' ----> sobald jemand die URL '.../xy' aufruft, wird man auf die neue Route mit entsprechender URL weitergeleitet

component: xyComponent ----> "Die Logik für die Route", Die entsprechende Component wird dann angezeigt

neue Component kann erstellt werden mit folgendem Terminal Befehl: 
|
|
--> ng g c *hier folgt der Name der Component*


**/