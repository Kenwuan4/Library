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
  onSumbit():void{
    let firstNameParam: string;
    let passParam: string;
    let lastName: string;
    let email: string;
    let userName: string;

    firstNameParam = ''+this.registerForm.value.firstName;
    passParam = this.encrypt.encryptUsingAES256(''+this.registerForm.value.password);

    lastName = ''+this.registerForm.value.lastName;
    email = ''+this.registerForm.value.email;
    userName = ''+this.registerForm.value.userName;

    this.authService.register(firstNameParam, lastName, email, userName,passParam).subscribe(
                        data => {
                                  console.log(data);
                                  this.registerForm.reset();
                                  this.router.navigateByUrl('/login');
                                });
    
  }

  getStaff():void{
    this.staffService.getStaff().subscribe(staf => this.staff = staf);
  }

}
