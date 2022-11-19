import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/Token';
import { Auth } from '../models/Auth';
import { CokieService } from './cokie.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient,
    private cokieService: CokieService) { }

  private httpOptions = {
    headers: new HttpHeaders({
      'authorization': 'Bearer ' + this.cokieService.get("token"),
      'content-type': 'application/json',
      'accept': 'application/json'
    })
  }

  /**
   * Iniciar sesion.
   * @param user nombre de usuario
   * @param password contraseña 
   * @returns {Observable}Token
   */
  login(user: string, password: string): Observable<Token> {
    const body = { "username": user, "password": password };
    return this.http.post<Token>("http://localhost:8085/authAPI/login", body);
  }

  /**
   * Crea un nuevo usuario
   * @param userName nombre de usuario
   * @param password contraseña
   * @returns {Observable} Auth
   */
  registerUser(userName: string, password: string): Observable<Auth> {
    const body = { "userName": userName, "password": password };
    return this.http.post<Auth>("http://localhost:8085/authAPI/register", body);
  }

  /**
   * Obtiene la informacion de un usuario por su nombre de usuario
   * @param user nombre de usuario
   * @returns {Observable} Auth
   */
  getUser(user: string): Observable<Auth> {
    return this.http.get<Auth>("http://localhost:8085/authAPI/user/" + user);
  }

  /**
   * Actualiza la informacion de un usuario.
   * @param id id del usuaio
   * @param userName nombre de usuario
   * @param password contraseña 
   * @param roles roles del usuario
   * @returns {Observable} Auth
   */
  updateUser(id: number, userName: string, password: string, roles: []): Observable<Auth> {
    const body = { "id": id, "username": userName, "password": password, "roles": roles };
    return this.http.put<Auth>("http://localhost:8085/authAPI/user/update", body);
  }

  /**
   * Valida que el token generado este valido
   * @returns {Observable} Anu
   */
  validate(): Observable<any> {
    return this.http.get("http://localhost:8085/authAPI/validateToken", this.httpOptions)
  }

}
