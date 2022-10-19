import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login (user: string, password: string): Observable<any>{
    const headers = new HttpHeaders()
    const body = {"username": user, "password": password};
    const params = new HttpParams()
    return this.http.post("http://localhost:8085/authAPI/login", body);
  }
}
