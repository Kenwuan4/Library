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

  ngOnInit(): void {
    this.getStaff();
    this.getPersonal();
  }

  getStaff(): void {
    this.staffService.getStaff().subscribe(staf => this.staff = staf);
  }

  getPersonal(): void {
    this.authService.getUser(this.cokieService.get("user")).subscribe(
      data => this.auth = data
    );

    console.log(this.auth.password)
    /*this.staffService.getStaffById(this.auth.id).subscribe(
      data => this.personal = data
    )*/
  }

  changeStatus(id: number): void {
    this.staffService.changeStatus(id).subscribe();

    this.router.navigateByUrl("/staff-info");
  }

  onSubmit() {

  }

}
