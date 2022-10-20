import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm = this.formBuilder.group({
    login:'',
    password:'',
  });

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private cookieService: CookieService) { }

  ngOnInit(): void {
  }
  onSubmit(): void {

    let userParam: string;
    let passParam: string;
    userParam = ''+this.loginForm.value.login;
    passParam = ''+this.loginForm.value.password;
    console.log('FormValue:', this.loginForm.value);
    console.log('Login:', userParam);
    console.log('Password:', passParam);
    this.authService.login(userParam, passParam).subscribe(
                        data => {
                                  console.log(data);
                                  let cookie =''+data;
                                  this.cookieService.set("cookie",cookie);
                                  console.log(this.cookieService.get("cookie"))
                                });
    this.loginForm.reset();
}

}
