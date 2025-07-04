import { Component, Input, inject } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { PostInput } from '../models/postinput.model';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { TagService } from '../services/tag.service';
import { Tag } from '../models/tag.model';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [],
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.scss']
})
export class CreatePostComponent 
{
  private categoryService = inject(CategoryService);

  // Eingabeobjekt für neuen Post vom Eltern-Component
  @Input() post! : PostInput; //postinput

  // Kategorien und Tags zur Anzeige im UI
  categories: Category[] = [];
  tags: Tag[] = [];

  // Temporäre Arrays und Modelle zum Erfassen von Auswahl & Eingaben
  selectedTags: number[] = [];

  // Zur Erstellung von neuen Tags und Kategorien
  tag: Tag = {id: 0, name: ''};
  category: Category = { id: 0, name: ''};



  constructor(private postService: PostService,  private router: Router, private tagService: TagService) 
  {

    // Lade alle Kategorien für Anzeige im DropdownMenu
    this.categoryService.getAllCategories().subscribe(cats => 
      {
        this.categories = cats;
      });


      //Lade alle Tags für Anzeige im DropdownMenu

    this.tagService.getAllTags().subscribe(tags => 
      {
        this.tags = tags;
      });
  }

  username = localStorage.getItem('username');

  selectedTagIds: number[] = [];


// neuen Post erstellen
createPost()
{
  const userId = localStorage.getItem('userId'); // damit ich die UserId setzen kann (siehe Line 71), wird beim Login ins LocalStorage gespeichert 
  console.log(userId)

  // Absicherung falls 'post' leer ist
  if (!this.post)
  {
    this.post = {} as PostInput //postinput
  }


  // Werte aus HTML Elementen ziehen
  const titleInput = (document.getElementById('postTitle') as HTMLTextAreaElement).value;
  const contentInput = (document.getElementById('postContent') as HTMLTextAreaElement).value;
  const categoryIdSelect = document.getElementById('category') as HTMLSelectElement;
  const tagIdSelect = document.getElementById('tag') as HTMLSelectElement;
  const tagId = Number(tagIdSelect.value);

  // Setzte Daten in das neue Post Objekt ein
  this.post.title = titleInput;
  this.post.content = contentInput;
  this.post.categoryId = categoryIdSelect.value ? Number(categoryIdSelect.value) : 0;
  this.post.tagIds = [tagId];
  this.post.UserId = parseInt(userId!, 10);

  // nur zur Kontrolle ob alle Daten korrekt übergeben wurden, falls Test angeschaut werden soll, unten die beiden SetTimeout Methoden auskommentieren
  console.log(this.post.categoryId);
  console.log(this.post.tagIds);
  console.log(this.post);

  //Fehler wenn keine Kategorie ausgewählt wurde
  if (this.post.categoryId === 0)
  {
    alert("Bitte wähle eine Kategorie aus!")
    return;
  }

  // Sendet neuen Post an den Server
  this.postService.createPost(this.post).subscribe({
    next: () => console.log('Neuer Post wurde erstellt'),
    error: err => console.error('Fehler:', err.error || err.message || err,"hallo", this.post)
  }
  );

    // nach Post erstellen Button klick, zurück zur Startseite und dann neu laden um Seite richtig zu aktualisieren
    setTimeout(() => 
    {
      this.router.navigate(['']);
    }, 1000);


    setTimeout(() => 
    {
      window.location.reload();
    }, 1000);

} 

  // neue Kategorie erstellen anhand von entsprechenden Eingaben im Eingabefeld
  createCategory()
  {
    const categoryName = (document.getElementById('createCategory') as HTMLInputElement).value;

    this.category.name = categoryName;

    console.log(categoryName)

    this.categoryService.createCategory(this.category).subscribe({
      next: () => console.log('Neue Kategorie wurde erstellt'),
      error: err => console.error('Fehler:', err.error || err.message || err,"hallo", this.category)
    });
  }

  
  // neuen Tag erstellen anhand von entsprechenden Eingaben im Eingabefeld 
  createTag()
  {
    const tagName = (document.getElementById('createTag') as HTMLInputElement).value;

    this.tag.name = tagName;

    this.tagService.createTag(this.tag).subscribe({
      next: () => console.log('Neuer Tag wurde erstellt'),
      error: err => console.error('Fehler:', err.error || err.message || err,"hallo", this.tag)
    });
  }


  


}
