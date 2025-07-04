import { Component, signal, Output, EventEmitter, effect, Input } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../services/post.service';
import { PostComponent } from "../post/post.component";
import { CategorySelectionService } from '../services/category-selection.service';
import { AppComponent } from '../app.component';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './paginator.component.html',
  styleUrl: './paginator.component.scss'
})
export class PaginatorComponent
{

  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;

  @Output() pageChange = new EventEmitter<number>();

  // vorherige Seite
  previous()
  {
    if ( this.currentPage > 1) this.pageChange.emit(this.currentPage - 1);


    // nach paginator click nach oben scrollen (funktioniert nicht, weil er das window scrollen will(geht nicht weil man nur divs scrollen kann))
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // nächste Seite
  next()
  {
    if (this.currentPage < this.totalPages) this.pageChange.emit(this.currentPage + 1);

    // nach paginator click nach oben scrollen (funktioniert nicht, weil er das window scrollen will(geht nicht weil man nur divs scrollen kann))
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

}
