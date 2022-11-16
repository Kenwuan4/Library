import { Injectable } from '@angular/core';
import { Staff } from '../models/Staff';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CokieService } from './cokie.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  private httpOptions = {
    headers: new HttpHeaders({
      'authorization': 'Bearer ' + this.cokieService.get("token")
    })
  }

  constructor(private http: HttpClient,
    private cokieService: CokieService) { }

  getStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>("http://localhost:8082/staffAPI/staff", this.httpOptions);
  }

  getStaffById(id: number): Observable<Staff> {
    return this.http.get<Staff>("http://localhost:8082/staffAPI/staff/" + id);
  }

  registerStaff(name: string, lastName: string, email: string): Observable<Staff> {
    const body = { "name": name, "lastname": lastName, "email": email };
    return this.http.post<Staff>("http://localhost:8082/staffAPI/newStaff", body);
  }

  changeStatus(id: number): Observable<Staff> {
    const body = {};
    return this.http.put<Staff>("http://localhost:8082/staffAPI/staff/" + id, body);
  }

  updateStaff(): Observable<Staff> {
    const body = {};
    return this.http.put<Staff>("http://localhost:8082/staffAPI/staff/", body);
  }
}
