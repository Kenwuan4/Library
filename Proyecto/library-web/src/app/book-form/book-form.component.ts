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

  /**
   * Cambia de acuerdo a la seccion en donde este, por ejemplo si se va a crear un libro se pondra el titulo "Crear libro" y 
   * si es para editar se pondra el titulo "Editar"
   */
  title: string = '';

  /**
   * Se emplea para saber si el usuario busca editar un libro o crear uno nuevo
   */
  edit: boolean = false;

  /**
   * Se emplea para almacenar la informacion del libro ya sea que se vaya a ediar o crear
   */
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

  /** 
   * Almacena la informacion de las editoriales 
   */
  editorials: Editorial[] = [];
  editorial?: Editorial;

  /**
   * Se emplea para conocer la editorial que el usuario selecciono en el dropdown
   */
  selected = '';

  /**
   * Dependiendo de si el usuario busca editar un libro o crear, se cambia el titulo de la pagina asi como lo que se carga. 
   * En el caso de que el usuario quiera editar un libro, se buscará ese libro en la base da datos para mostrarle la informacion al usuario. 
   * En tanto la creación o edición de un libro se obtendrá la información de las editoriales.
   */
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

  /**
   * Se obtiene la información que el usuario cambio o agrego y dependiendo de si es para editar o crear un libro, se llama al bookService con la funcion de 
   * actualizar un libro o agregar uno nuevo.
   * En caso de editar un libro, al finalizar se le redireccionará al componente book-info y si es la creacion se le redireccionará al componente principal.
   */

  onSubmit(): void {
    let name: string = this.book.name;
    let author: string = this.book.author;
    let description: string = this.book.description;
    let url: string = this.book.url;
    let price: number = this.book.price;
    let pages: number = this.book.pages;
    let editorialId: number = Number(this.selected.split(":")[1]);

    if (this.edit) {
      let id = Number(this.route.snapshot.paramMap.get('id'));
      this.bookService.putBook(id, name, description, author, url, pages, price, editorialId).subscribe(
        data => this.book = data
      )
      this.router.navigateByUrl("/book-info/" + id);
    }
    else {
      this.bookService.postBook(name, description, author, url, pages, price, editorialId).subscribe(
        data => this.book = data
      );
      this.router.navigateByUrl("/books");
    }
  }


  /**
   * Se emplea para conocer la editorial que escogio el usuario 
   * @param {any} e: codigo y nombre de editorial escogida
   */
  update(e: any) {
    this.selected = e.target.value;
  }

  /**
   * Obtener la información de todas las editoriales.
   */

  getEditorials(): void {
    this.editorialService.getEditorials().subscribe(data => this.editorials = data);
  }

  /**
   * Obtener la información de un libro mediante el id del mismo.
   */
  getBookById(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.bookService.getBookById(id).subscribe(book => this.book = book);
  }

}
