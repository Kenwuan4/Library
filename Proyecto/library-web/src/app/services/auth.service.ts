import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from 'src/app/models/Staff';
import { Token } from 'src/app/models/Token';
import { Auth } from '../models/Auth';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) { }

  login(user: string, password: string): Observable<Token> {
    //const headers = new HttpHeaders()
    const body = { "username": user, "password": password };
    //const params = new HttpParams()
    return this.http.post<Token>("http://localhost:8085/authAPI/login", body);
  }

  registerUser(userName: string, password: string): Observable<Auth> {
    //const headers = new HttpHeaders();
    const body = { "userName": userName, "password": password };
    return this.http.post<Auth>("http://localhost:8085/authAPI/register", body);
  }

}
