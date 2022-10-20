import { Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})

export class BookInfoComponent implements OnInit {

  book?: Book;

  constructor(private bookService: BookService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookById(); 
  }

  getBookById():void{
    const id = Number (this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(book => this.book = book);
    console.log(this.book);
  }

}
