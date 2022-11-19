import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Book } from '../models/Book';
import { CokieService } from './cokie.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient,
    private cokieService: CokieService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'authorization': 'Bearer ' + this.cokieService.get("token")
    })
  }
  /**
   * Obtiene la informacion de los libros paginados
   * @param page Pagina actual de la paginacion
   * @param size Tamaño de libros a mostrar
   * @param order Forma en la que se ordenará 
   * @param asc Booleano para determinar si es ascendente o descente el orden
   * @returns {Observable} Any
   */
  getBook(page: number, size: number, order: string, asc: boolean): Observable<any> {
    return this.http.get<any>("http://localhost:8084/bookAPI/books?" + `page=${page}&size=${size}&order=${order}&asc=${asc}`);
  }
  /**
   * Obtiene la informacion de un libro por su id
   * @param id id del libro
   * @returns {Observable} Book
   */
  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>("http://localhost:8084/bookAPI/books/" + id);
  }

  /**
   * Obtiene la informacion de los libros que tengan la editorial requerida
   * @param name nombre de editorial
   * @returns {Observable} Book[]
   */

  getBooksByEditorial(name: string): Observable<Book[]> {
    return this.http.get<Book[]>("http://localhost:8084/bookAPI/books/editorials/" + name);
  }

  /**
   * Obtiene la informacion de los libros que tenga similitudes con el titulo 
   * @param name titulo del libro
   * @returns {Observable} Book[]
   */
  getBookByTitle(name: string): Observable<Book[]> {
    return this.http.get<Book[]>("http://localhost:8084/bookAPI/books/search/" + name);
  }

  /**
   * Elimina un libro por su id 
   * @param id id del libro
   * @returns {Observable} Any
   */
  deleteBook(id: number): Observable<any> {
    console.log(id);
    return this.http.delete("http://localhost:8084/bookAPI/book/" + id, this.httpOptions);
  }

  /**
   * Edita la informacion de un libro
   * @param id id del libro
   * @param name nombre del libro
   * @param description decripcion del libro
   * @param author autor del libro
   * @param url url de la imagen del libro
   * @param pages cantidad de paginas del libro
   * @param price precio del libro
   * @param editorialId id de la editorial del libro
   * @returns {Observable} Book
   */
  putBook(id: number, name: string, description: string, author: string, url: string, pages: number, price: number, editorialId: number): Observable<Book> {
    const body = { "id": id, "name": name, "description": description, "author": author, "url": url, "pages": pages, "price": price, "editorialId": editorialId };
    return this.http.put<Book>("http://localhost:8084/bookAPI/book", body, this.httpOptions);
  }

  /**
   * Crea un nuevo libro
   * @param name nombre del libro
   * @param description decripcion del libro
   * @param author autor del libro
   * @param url url de la imagen del libro
   * @param pages cantidad de paginas del libro
   * @param price precio del libro
   * @param editorialId id de la editorial del libro
   * @returns {Observable} Book
   */
  postBook(name: string, description: string, author: string, url: string, pages: number, price: number, editorialId: number): Observable<Book> {
    const body = { "name": name, "description": description, "author": author, "url": url, "pages": pages, "price": price, "editorialId": editorialId }
    return this.http.post<Book>("http://localhost:8084/bookAPI/book", body);
  }

}
