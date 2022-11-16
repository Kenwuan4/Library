import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/Book';
import { CokieService } from '../services/cokie.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
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

  searchForm = this.formBuilder.group({
    search: ''
  });

  constructor(private bookService: BookService,
    private cokieService: CokieService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) { }

  update(e: any) {
    this.selected = e.target.value;
  }
  getBooks(): void {
    this.title = "Novedades";
    this.bookService.getBook().subscribe(
      book => this.books = book
    );

  }

  ngDoCheck(): void {
    if (this.cokieService.get("token").length > 0) {
      this.cookie = true;
    }
    else {
      this.cookie = false;
    }


  }

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

  ngOnInit(): void {
    this.getBooks();
  }



}
