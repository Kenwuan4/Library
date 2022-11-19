import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editorial } from '../models/Editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(private http: HttpClient) { }

  /**
   * Llama al back y obtiene informacion de las editoriales
   * @returns {Observable} Edtitorial[]
   */
  getEditorials(): Observable<Editorial[]> {
    return this.http.get<Editorial[]>("http://localhost:8081/editorialAPI/editorials" /*, { headers: { skip: "true" } }*/);
  }

  /**
   * Llama al back y obtiene informacion de una editorial por su nombre
   * @param name nombre de editorial 
   * @returns {Observable} Editorial
   */
  getEditorialByName(name: string): Observable<Editorial> {
    return this.http.get<Editorial>("http://localhost:8081/editorialAPI/editorials/" + name /*, { headers: { skip: "true" } }*/);
  }

  /**
   * Llama al back y obtiene informacion de una editorial por su nombre
   * @param id id de la editorial 
   * @returns {Observable} Editorial
   */
  getEditorialById(id: number): Observable<Editorial> {
    return this.http.get<Editorial>("http://localhost:8081/editorialAPI/editorial/" + id /*, { headers: { skip: "true" } }*/);
  }

  /**
   * Llama al back y edita una editorial
   * @param id id del editorial
   * @param name Nombre de la editorial
   * @param url url de la imagen de la editorial
   * @param webSite pagina web de la editorial
   * @returns {Observable} Editorial
   */
  putEditorial(id: number, name: string, url: string, webSite: string): Observable<Editorial> {
    const body = { "id": id, "name": name, "img": url, "web_site": webSite };
    return this.http.put<Editorial>("http://localhost:8081/editorialAPI/editorial/", body);
  }

  /**
   * Llama al back y crea una editorial nueva
   * @param name nombre de la editorial
   * @param url url de la imagen de la editorial
   * @param webSite pagina web de la editorial
   * @returns {Observable} Editorial
   */
  postEditorial(name: string, url: string, webSite: string): Observable<Editorial> {
    const body = { "name": name, "img": url, "web_site": webSite };
    return this.http.post<Editorial>("http://localhost:8081/editorialAPI/editorial/", body);
  }

  /**
   * Llama al back y elimina una editorial por su id
   * @param id id de la editorial
   * @returns {Observable} Any
   */
  deleteEditorial(id: number): Observable<any> {
    return this.http.delete("http://localhost:8081/editorialAPI/editorial/" + id);
  }
}
