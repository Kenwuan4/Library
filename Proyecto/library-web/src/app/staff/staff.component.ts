import { Component, OnInit } from '@angular/core';
import { Staff } from '../models/Staff';
import { StaffService } from '../services/staff.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { EncryptService } from '../services/encrypt.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  registerForm = this.formBuilder.group({
    lastName: '',
    email: '',
    firstName: '',
    password: '',
    userName: '',
    birth: '',
    identification: ''
  })

  staff: Staff[] = [];

  console = console;
  constructor(private staffService: StaffService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private encrypt: EncryptService,
    private router: Router) { }

  ngOnInit(): void {

  }
  onSumbit(): void {
    let firstNameParam: string = '' + this.registerForm.value.firstName;
    let lastName: string = '' + this.registerForm.value.lastName;
    let email: string = '' + this.registerForm.value.email;
    let iden: number = Number(this.registerForm.value.identification);
    let birth = '' + (this.registerForm.value.birth);

    let userName: string = '' + this.registerForm.value.userName;
    let passParam: string = this.encrypt.encryptUsingAES256('' + this.registerForm.value.password);


    this.staffService.registerStaff(firstNameParam, lastName, email, iden, new Date(birth), true).subscribe(
      data => { }
    )

    this.authService.registerUser(userName, passParam).subscribe(
      data => {
        this.registerForm.reset();
        this.router.navigateByUrl('/login');
      });

  }

  getStaff(): void {
    this.staffService.getStaff().subscribe(staf => this.staff = staf);
  }

}
