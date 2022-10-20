import { Injectable } from '@angular/core';
import { Staff } from '../models/Staff';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  getStaff(): Observable<Staff[]>{
    return this.http.get<Staff[]>("http://localhost:8082/staff");
  }


}
