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

  bookForm = this.formBuilder.group({
    name: '',
    author: '',
    pages: 0,
    price: 0,
    url: '',
    editorial: 0,
    description: ''
  });


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
    let name: string = '' + this.bookForm.value.name;
    let author: string = '' + this.bookForm.value.author;
    let description: string = '' + this.bookForm.value.description;
    let url: string = '' + this.bookForm.value.url;
    let price: number = <number>this.bookForm.value.price;
    let pages: number = <number>this.bookForm.value.pages;
    let editorialId: number = <number>this.bookForm.value.editorial;

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
