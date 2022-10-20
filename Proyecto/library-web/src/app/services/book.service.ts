import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/Book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  getBook():Observable<Book[]>{
    return this.http.get<Book[]>("http://localhost:8080/bookAPI/books");
  }

  getBookById(id:number):Observable<Book>{
    return this.http.get<Book>("http://localhost:8080/bookAPI/books/"+id);
  }
}
