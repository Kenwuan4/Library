import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Book } from '../models/Book';
import { Editorial } from '../models/Editorial';
import { EditorialService } from '../services/editorial.service';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private bookService: BookService,
    private editorialService: EditorialService,
    private router: Router,
    private route: ActivatedRoute) { }

  title: string = '';
  edit: boolean = false;
  book: Book =
    {
      "id": 0,
      "name": '',
      "description": '',
      "author": '',
      "url": '',
      "pages": 0,
      "price": 0,
      "editorialId": 0
    };

  editorials: Editorial[] = [];
  editorial?: Editorial;
  ngOnInit(): void {
    this.getEditorials();
    if (this.router.url.includes('edit')) {
      this.edit = true;
      this.title = 'Editar';
      this.getBookById();
    }
    else {
      this.title = 'Crear libro';
    }
  }

  onSubmit(): void {
    let name: string = this.book.name;
    let author: string = this.book.author;
    let description: string = this.book.description;
    let url: string = this.book.url;
    let price: number = this.book.price;
    let pages: number = this.book.pages;
    let editorialId: number = 1;
    console.log(this.editorial?.id)
    if (this.edit) {
      let id = Number(this.route.snapshot.paramMap.get('id'));
      this.bookService.putBook(id, name, description, author, url, pages, price, editorialId).subscribe(
        data => this.book = data
      )
    }
    else {
      this.bookService.postBook(name, description, author, url, pages, price, editorialId).subscribe(
        data => this.book = data
      );
    }
  }

  getEditorials(): void {
    this.editorialService.getEditorials().subscribe(data => this.editorials = data);
  }

  getBookById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(book => this.book = book);
  }

}
