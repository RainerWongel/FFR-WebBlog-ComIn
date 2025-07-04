import { Component, Input, Output, signal, inject, EventEmitter } from '@angular/core';
import { CategorySelectionService } from '../services/category-selection.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../models/category.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent 
{
  private categoryService = inject(CategoryService);
  categories: Category[] = [];
  categoryMap = new Map<number, string>();

  constructor(private selectionService: CategorySelectionService) 
  {
      this.categoryService.getAllCategories().subscribe(cats => 
      {
        this.categories = cats;
      });
  }


  categoryList : Category[] = [];
  @Input() category! : Category;
  @Output() categorySelected = new EventEmitter<number>();


  // Wird aufgerufen, wenn eine Kategorie-ID ausgewählt wird
  selectedCategory(id: number)
  {
    if (id <= 0) return;
    this.categorySelected.emit(id);
  }

  // Listener für Kategory Sidebar
  onCategoryClick(categoryId: number | null)
  {
    this.selectionService.selectedCategory(categoryId);
  }

}
