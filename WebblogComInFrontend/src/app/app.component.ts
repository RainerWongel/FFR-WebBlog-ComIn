import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Inject, Input, signal, effect, ViewChild } from '@angular/core';
import { RouterOutlet, Router, ActivatedRoute } from '@angular/router';
import { AuthService } from './services/auth.service';
import { Post } from './models/post.model';
import { Category } from './models/category.model';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryService } from './services/category.service';
import { CategorySelectionService } from './services/category-selection.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { PostService } from './services/post.service';
import { PostComponent } from './post/post.component';
import { Subject } from 'rxjs';
import { PaginatorComponent } from "./paginator/paginator.component";


@Component
(
  {
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, CategoriesComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
  }
)

export class AppComponent 
{

  searchTerm$ = new Subject<string>();

  onGlobalSearch(event: Event)
  {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(value);
  }

  constructor(private router: Router, 
    private authService: AuthService, 
    private postService: PostService,
    private route: ActivatedRoute,
    ) 
    {
      this.route.paramMap.subscribe(params => {
        const id = Number(params.get('id'));
        if(!isNaN(id))
        {
          this.loadPostForCategory(id);
        }
      });
    }

    posts = signal<Post[]>([]);
    @Input() post!: Post;

    loadPostForCategory(categoryId: number)
    {
      this.postService.getPostsByCategory(categoryId).subscribe(posts => {
        this.posts.set(posts);
      });
    }


  @Input() category!: Category;

 // commentslist

  title = 'WebBlogFrontend';

  createMode = false;
  isLoggedIn: boolean = false;

  ngOnInit()
  {
    this.isLoggedIn = localStorage.getItem('LogInStatus') === 'true';
  }



  toggleCreateMode() 
  {
    this.createMode = !this.createMode;
  }

 

  onRouteChange(event: Event): void 
  {
    console.log('Route wurde geändert');
    const route = (event.target as HTMLSelectElement).value;
    this.router.navigate([`/${route}`]);
  }


  onLogout()
  {
    console.log("logout wurde gedrückt")

    this.authService.logout().subscribe(
      () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        localStorage.removeItem('LogInStatus');
        const status = document.getElementById('statusBar');
        if (status) status.textContent = 'Nicht angemeldet';
      },
      err => console.error('Fehler beim logout', err)
    );
    this.isLoggedIn = false;
  }

  
  clickLoginHandler(event: MouseEvent)
  {
    this.onRouteChange(event);
  }

  LogInStatus = localStorage.getItem('LogInStatus') === 'true';

  selectedCategoryId: number | null = null;

  onCategorySelect(id: number)
  {
    this.selectedCategoryId = id;
  }

  filterPosts()
  {
    
  }


  clickSettingsHandler(event: MouseEvent)
  {
    this.onRouteChange(event);

  }
  

}

document.addEventListener('DOMContentLoaded', () => 
// Angemeldet als:
  {
    const username = localStorage.getItem('username');
    const status = document.getElementById('statusBar');
    if (username && status)
    {
     status.textContent = `Angemeldet als: ${username}`;
    }
  },

);