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

  /**
   * Almacenar la informacion del libro especifico.
   */
  book?: Book;

  /**
   * Conocer si el usuario se a utenticado o no.
   */
  public cookie: boolean = false;

  constructor(private bookService: BookService,
    private route: ActivatedRoute,
    private cokieService: CokieService,
    private router: Router) { }

  /**
   * Al iniciar obtener la información del libro.
   */
  ngOnInit(): void {
    this.getBookById();
  }

  /**
   * Verificar si el usuario esta autenticado. en caso de que si se activan botones de editar o eliminar el libro.
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
   * Obtener la información del libro seleccionado mediante el id del libro enviado por medio de la url.
   */
  getBookById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(book => this.book = book);
  }

  /**
   * Eliminar el libro mediante su id.
   * @param {number} id: Id del libro a eliminar. 
   */
  deleteBook(id: number): void {
    this.bookService.deleteBook(id).subscribe();
    this.router.navigateByUrl("/books");
  }

}
