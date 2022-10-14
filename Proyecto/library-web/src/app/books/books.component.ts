import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import {Book} from '../models/Book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  getBooks():void{
    this.bookService.getBook().subscribe(
      book => this.books = book
    );
    
  }

  ngOnInit(): void {
    this.getBooks();
  }



}
