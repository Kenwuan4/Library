import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editorial } from '../models/Editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(private http: HttpClient) { }

  getEditorials(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>("http://localhost:8080/editorialAPI/editorials", { headers: { skip: "true" } });
  }

  getEditorialByName(name: string): Observable<Editorial> {
    return this.http.get<Editorial>("http://localhost:8080/editorialAPI/editorials/" + name, { headers: { skip: "true" } });
  }

  deleteEditorial(id: number): void {
    this.http.delete("http://localhost:8080/editorialAPI/editorial/" + id);
  }
}
