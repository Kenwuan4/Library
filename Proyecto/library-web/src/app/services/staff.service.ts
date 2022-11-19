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

  /**
   * Llama al back y obtiene informacion del staff
   * @returns {Observable} Staff[]
   */
  getStaff(): Observable<Staff[]> {
    return this.http.get<Staff[]>("http://localhost:8082/staffAPI/staff", this.httpOptions);
  }

  /**
   * Llama al back y obtiene informacion del staff por el id
   * @param {number} id Id del staff 
   * @returns {Observable} Staff
   */
  getStaffById(id: number): Observable<Staff> {
    return this.http.get<Staff>("http://localhost:8082/staffAPI/staff/" + id);
  }

  /**
   * 
   * @param name Nombre del personal
   * @param lastName Apellido del personal
   * @param email Email del personal
   * @param iden Identificacion del personal 
   * @param birth Fecha de nacimiento del personal
   * @param status Esatado del personal (verdadero o falso)
   * @returns {Observable} Staff
   */
  registerStaff(name: string, lastName: string, email: string, iden: number, birth: Date, status: boolean): Observable<Staff> {
    const body = { "name": name, "lastname": lastName, "email": email, "identification": iden, "birth": birth, "status": status };
    return this.http.post<Staff>("http://localhost:8082/staffAPI/newStaff", body);
  }

  /**
   * Llama al back y cambia el status del staff
   * @param id id de una persona 
   * @returns {Observable} Staff
   */
  changeStatus(id: number): Observable<Staff> {
    const body = {};
    return this.http.put<Staff>("http://localhost:8082/staffAPI/staff/" + id, body);
  }

  /**
   * actualiza los campos del personal.
   * @param id id de la persona
   * @param name Nombre del personal
   * @param lastName Apellido del personal
   * @param email Email del personal
   * @param iden Identificacion del personal 
   * @param birth Fecha de nacimiento del personal
   * @param status Esatado del personal (verdadero o falso)
   * @returns {Observable} Staff
   */
  updateStaff(id: number, name: string, lastName: string, email: string, iden: number, birth: Date, status: boolean): Observable<Staff> {
    const body = { "id": id, "name": name, "lastname": lastName, "email": email, "identification": iden, "birth": birth, "status": status };
    return this.http.put<Staff>("http://localhost:8082/staffAPI/staff/", body);
  }
}
