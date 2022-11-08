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

  getBook(): Observable<Book[]> {
    return this.http.get<Book[]>("http://localhost:8080/bookAPI/books", { headers: { skip: "true" } });
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>("http://localhost:8080/bookAPI/books/" + id, { headers: { skip: "true" } });
  }

  getBooksByEditorial(name: string): Observable<Book> {
    return this.http.get<Book>("http://localhost:8080/bookAPI/books/editorials/" + name, { headers: { skip: "true" } });
  }

  getBookByTitle(name: string): Observable<Book[]> {
    return this.http.get<Book[]>("http://localhost:8080/bookAPI/boos/search/" + name, { headers: { skip: "true" } });
  }

  deleteBook(id: number, name: string): void {
    console.log(id);
    this.http.delete("http://localhost:8080/bookAPI/book/" + id, { headers: { Authorization: 'Bearer ' + this.cokieService.get("token") } });
  }

  putBook(id: number, name: string, description: string, author: string, url: string, pages: number, price: number, editorialId: number): Observable<Book> {
    const body = { "id": id, "name": name, "description": description, "author": author, "url": url, "pages": pages, "price": price, "editorialId": editorialId };
    console.log("hola");
    return this.http.put<Book>("http://localhost:8080/bookAPI/book", body);
  }

  postBook(name: string, description: string, author: string, url: string, pages: number, price: number, editorialId: number): Observable<Book> {
    const body = { "name": name, "description": description, "author": author, "url": url, "pages": pages, "price": price, "editorialId": editorialId }
    return this.http.post<Book>("http://localhost:8080/bookAPI/book", body);
  }

}
