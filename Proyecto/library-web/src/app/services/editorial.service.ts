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
    return this.http.get<Editorial[]>("http://localhost:8081/editorialAPI/editorials" /*, { headers: { skip: "true" } }*/);
  }

  getEditorialByName(name: string): Observable<Editorial> {
    return this.http.get<Editorial>("http://localhost:8081/editorialAPI/editorials/" + name /*, { headers: { skip: "true" } }*/);
  }

  getEditorialById(id: number): Observable<Editorial> {
    return this.http.get<Editorial>("http://localhost:8081/editorialAPI/editorial/" + id /*, { headers: { skip: "true" } }*/);
  }

  putEditorial(id: number, name: string, url: string, webSite: string): Observable<Editorial> {
    const body = { "id": id, "name": name, "img": url, "web_site": webSite };
    return this.http.put<Editorial>("http://localhost:8081/editorialAPI/editorial/", body);
  }

  postEditorial(name: string, url: string, webSite: string): Observable<Editorial> {
    const body = { "name": name, "img": url, "web_site": webSite };
    return this.http.post<Editorial>("http://localhost:8081/editorialAPI/editorial/", body);
  }

  deleteEditorial(id: number): void {
    this.http.delete("http://localhost:8081/editorialAPI/editorial/" + id);
  }
}
