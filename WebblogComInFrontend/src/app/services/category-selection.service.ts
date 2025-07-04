import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class CategorySelectionService
{
    private selectedCategorySubject = new BehaviorSubject<number | null>(null);
    selectedCategory$ = this.selectedCategorySubject.asObservable();

    selectedCategory(id: number | null)
    {
        this.selectedCategorySubject.next(id);
    }
}