import { Component, ViewChild } from '@angular/core';
import { PostComponent } from '../post/post.component';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { User } from '../models/user.model';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { CategorySelectionService } from '../services/category-selection.service';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { PaginatorComponent } from '../paginator/paginator.component';
import { CategoriesComponent } from "../categories/categories.component";




@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [PostComponent, PaginatorComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent 
{
  postsList : Post[] = [];
  filteredPosts: Post[] = [];
  filteredPostsBySearch: Post[] = [];
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  currentPage = 1;
  totalPages = 1;
  
  constructor(private postService: PostService, private categorySelectionService: CategorySelectionService, private app: AppComponent, private http: HttpClient)
  {
    this.loadPosts(1);

    //Kategorien Filter
    this.categorySelectionService.selectedCategory$.subscribe(id => {
      this.selectedCategoryId = id;
      this.applyFilter();
    });
    

    //Searchbar Filter
    this.app.searchTerm$.subscribe(term => {
      this.filteredPosts = this.postsList.filter(post => 
        post.title.toLowerCase().includes(term.toLowerCase()) ||
        post.content.toLowerCase().includes(term.toLowerCase())
        );
    });

  }


  // nach ausgewählter kategorie filtern
  applyFilter()
  {
    this.filteredPosts = this.selectedCategoryId
      ? this.postsList.filter(p => p.categoryId === this.selectedCategoryId)
      : [...this.postsList];
  }


  //Kategorie Filter Logik
  filterByCategory(id: number | null)
  {
    this.filteredPosts = id
    ? this.postsList.filter(p => p.categoryId === id)
    : [...this.postsList];
  }


  // Paginator
  PageInfoChanged(pageInfo: { currentPage: number; totalPages: number})
  {
    this.currentPage = pageInfo.currentPage;
    this.totalPages = pageInfo.totalPages;
  }

  // Paginator
  loadPosts(page: number = 1)
  {
    this.postService.getPagedPosts(page, 10).subscribe(data => { // zweiter Parameter in getPagedPosts(page, number <--- POSTS PER SITE)
      this.postsList = data.data;
      this.filteredPosts = data.data;
      this.currentPage = data.currentPage;
      this.totalPages = data.totalPages;
    });
  }

}