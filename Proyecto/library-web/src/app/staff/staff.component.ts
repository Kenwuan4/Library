import { Component, OnInit } from '@angular/core';
import { Staff } from '../models/Staff';
import { StaffService } from '../services/staff.service';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { EncryptService } from '../services/encrypt.service';


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
              private encrypt: EncryptService) { }

  ngOnInit(): void {
    
  }
  onSumbit():void{
    let userParam: string;
    let passParam: string;
    let lastName: string;
    let email: string;
    let userName: string;

    userParam = ''+this.registerForm.value.firstName;
    passParam = this.encrypt.encryptUsingAES256(''+this.registerForm.value.password);

    lastName = ''+this.registerForm.value.lastName;
    email = ''+this.registerForm.value.email;
    userName = ''+this.registerForm.value.email;

    console.log('FormValue:', this.registerForm.value);
    console.log('Login:', userParam);
    console.log('Password:', passParam);
    this.authService.register(userParam, passParam, lastName, email, userName).subscribe(
                        data => {
                                  console.log(data);
                                });
    this.registerForm.reset();
  }

  getStaff():void{
    this.staffService.getStaff().subscribe(staf => this.staff = staf);
  }

}
