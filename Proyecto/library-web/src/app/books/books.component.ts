import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Book } from '../models/Book';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CokieService } from '../services/cokie.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  public cookie: boolean = false;
  books: Book[] = [];
  title: string = '';
  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router,
    private cokieService: CokieService) { }

  getBooks(): void {
    this.bookService.getBook().subscribe(
      book => this.books = book
    );
    this.title = 'Novedades'
  }

  getBooksBytitle(): void {
    let name = String(this.route.snapshot.paramMap.get('title'));
    console.log(name);

    this.bookService.getBookByTitle(name).subscribe(
      book => {
        this.books = book
        console.log(book)
      })

    if (this.books.length === 0) {
      this.title = 'No se encontraron resultados para la busqueda';
    }
    else {
      this.title = 'Resultados';
    }

  }

  ngDoCheck(): void {
    if (this.cokieService.get("token").length > 0) {
      this.cookie = true;
    }
    else {
      this.cookie = false;
    }
  }

  ngOnInit(): void {
    if (this.router.url.includes('search')) {
      this.getBooksBytitle();
    }
    else
      this.getBooks();
  }
}
