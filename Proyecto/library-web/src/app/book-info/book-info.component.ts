import { Component, OnInit } from '@angular/core';
import { Book } from '../models/Book';
import { BookService } from '../services/book.service';
import { ActivatedRoute } from '@angular/router';
import { CokieService } from '../services/cokie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-info',
  templateUrl: './book-info.component.html',
  styleUrls: ['./book-info.component.css']
})

export class BookInfoComponent implements OnInit {

  book?: Book;
  public cookie: boolean = false;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private cokieService: CokieService,
    private router: Router) { }

  ngOnInit(): void {
    this.getBookById();
  }

  ngDoCheck(): void {
    if (this.cokieService.get("token").length > 0) {
      this.cookie = true;
    }
    else {
      this.cookie = false;
    }
  }

  getBookById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(book => this.book = book);
  }

  deleteBook(id: number): void {
    this.bookService.deleteBook(id);
    this.router.navigateByUrl("/books");
  }

}
