import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class TagSelectionService
{
    private selectedTagSubject = new BehaviorSubject<number | null>(null);
    selectedTag$ = this.selectedTagSubject.asObservable();

    selectedTag(id: number | null)
    {
        this.selectedTagSubject.next(id);
    }
}