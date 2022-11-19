import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/Book';
import { CokieService } from '../services/cokie.service';

import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  title: string = '';
  books: Book[] = [];
  cookie: boolean = false;
  search = [
    "Libros",
    "Editoriales"
  ]
  selected = 'Libros';
  pages = 0;

  searchForm = this.formBuilder.group({
    search: ''
  });

  constructor(private bookService: BookService,
    private cokieService: CokieService,
    private formBuilder: FormBuilder) { }

  /**
   * Se emplea para conocer la editorial que escogio el usuario 
   * @param {any} e: codigo y nombre de editorial escogida
   */
  update(e: any) {
    this.selected = e.target.value;
  }

  /**
   * Obtiene la información de los libros paginados 
   * @param {number} page: Pagina actual  
   */
  getBooks(page: number): void {
    this.title = "Novedades";
    this.bookService.getBook(page, 3, "id", true).subscribe(
      book => {
        console.log(book)
        this.pages = book.totalPages
        this.books = book.content
      }
    );

  }

  /**
   * Verifica si el usuario esta autenticado, si lo está aparece un boton con la opcion de crear un nuevo libro.
   */
  ngDoCheck(): void {
    if (this.cokieService.get("token").length > 0) {
      this.cookie = true;
    }
    else {
      this.cookie = false;
    }
  }

  /**
   * Realiza la busqueda dependiendo de la opcion que el usuario haya escogido, libro o editorial.
   */
  onSumbit() {
    this.title = "Resultados"
    let search: string = '' + this.searchForm.value.search;
    if (this.selected == "Libros") {
      this.bookService.getBookByTitle(search).subscribe(
        data => this.books = data
      )
    }
    else {
      this.bookService.getBooksByEditorial(search).subscribe(
        data => this.books = data
      )
    }

  }

  /**
   * Obtiene los primero 3 libros.
   */
  ngOnInit(): void {
    this.getBooks(0);
  }



}
