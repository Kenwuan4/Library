import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/Book';
import { CokieService } from './cokie.service';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient,
              private cokieService: CokieService) { }

  getBook():Observable<Book[]>{
    return this.http.get<Book[]>("http://localhost:8080/bookAPI/books");
  }

  getBookById(id:number):Observable<Book>{
    return this.http.get<Book>("http://localhost:8080/bookAPI/books/"+id);
  }

  deleteBook(id:number, name:string):void{

    var header = new HttpHeaders({Authorization: "Bearer "+this.cokieService.get(name)});
    const httpOptions = {
      headers: header
    };

    this.http.delete("http://localhost:8080/bookAPI/book/"+id, httpOptions);
    
  }
}
