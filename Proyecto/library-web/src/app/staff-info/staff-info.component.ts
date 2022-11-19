import { Component, OnInit } from '@angular/core';
import { Auth } from '../models/Auth';
import { Staff } from '../models/Staff';
import { StaffService } from '../services/staff.service';
import { FormBuilder } from '@angular/forms';
import { CokieService } from '../services/cokie.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.css']
})
export class StaffInfoComponent implements OnInit {

  staff: Staff[] = [];

  personal: Staff = {
    "id": 0,
    "name": '',
    "lastname": '',
    "identification": 0,
    "birth": new Date(),
    "email": '',
    "status": true
  }

  auth: Auth = {
    "id": 0,
    "userName": '',
    "password": '',
    "roles": []
  }

  stafForm = this.formBuilder.group({
    name: '',
    lastName: '',
    userName: '',
    email: ''
  })

  constructor(private staffService: StaffService,
    private formBuilder: FormBuilder,
    private cokieService: CokieService,
    private authService: AuthService,
    private router: Router) { }

  /**
   * inicializa los datos del staff y usuario
   */
  ngOnInit(): void {
    this.getStaff();
    this.getPersonal();
  }

  /**
   * Obtiene los datos del staff
   */
  getStaff(): void {
    this.staffService.getStaff().subscribe(staf => this.staff = staf);
  }

  /**
   * Obtiene los datos del usuario
   */
  getPersonal(): void {
    this.authService.getUser(this.cokieService.get("user")).subscribe(
      data => {
        this.auth = data
        this.staffService.getStaffById(this.auth.id).subscribe(
          data => this.personal = data
        )
      }
    );
  }

  /**
   * Cambia el status del usuario por su id.
   * @param {number} id: Id del usuario 
   */
  changeStatus(id: number): void {
    this.staffService.changeStatus(id).subscribe();

    this.router.navigateByUrl("/staff-info");
  }

  /**
   * Se hace la actualizacion de los datos del usuario. 
   */
  onSubmit() {
    let id = this.personal.id;
    let name = this.personal.name;
    let lastName = this.personal.lastname;
    let email = this.personal.email;
    let iden = this.personal.identification;
    let birth = this.personal.birth;
    let status = this.personal.status;

    let userName = this.auth.userName;
    let password = this.auth.password;
    let roles = this.auth.roles;

    this.staffService.updateStaff(id, name, lastName, email, iden, birth, status).subscribe();
    this.authService.updateUser(id, userName, password, roles).subscribe();

  }

}
