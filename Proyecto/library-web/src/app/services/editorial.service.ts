import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Editorial } from '../models/Editorial';

@Injectable({
  providedIn: 'root'
})
export class EditorialService {

  constructor(private http: HttpClient) { }

  getEditorials():Observable<Editorial[]>{
    return this.http.get<Editorial[]>("http://localhost:8081/editorials");
  }
}
