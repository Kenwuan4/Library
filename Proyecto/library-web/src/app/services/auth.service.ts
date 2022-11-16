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

  login(user: string, password: string): Observable<Token> {
    //const headers = new HttpHeaders()
    const body = { "username": user, "password": password };
    //const params = new HttpParams()
    return this.http.post<Token>("http://localhost:8080/authAPI/login", body);
  }

  registerUser(userName: string, password: string): Observable<Auth> {
    //const headers = new HttpHeaders();
    const body = { "userName": userName, "password": password };
    return this.http.post<Auth>("http://localhost:8080/authAPI/register", body);
  }

  getUser(user: string): Observable<Auth> {
    return this.http.get<Auth>("http://localhost:8085/authAPI/user/" + user);
  }

  updateUser(id: number, userName: string, password: string, roles: []): Observable<Auth> {
    const body = { "id": id, "username": userName, "password": password, "roles": roles };
    return this.http.put<Auth>("http://localhost:8085/authAPI/user/update", body);
  }

  validate(): Observable<any> {
    return this.http.get("http://localhost:8085/authAPI/validateToken", this.httpOptions)
  }

}
