import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CokieService } from '../services/cokie.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm = this.formBuilder.group({
    login: '',
    password: '',
  });

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private cokieService: CokieService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onSubmit(): void {

    let userParam: string;
    let passParam: string;
    userParam = '' + this.loginForm.value.login;
    passParam = '' + this.loginForm.value.password;


    this.authService.login(userParam, passParam).subscribe(
      data => {
        this.cokieService.set("token", data.token);
        this.loginForm.reset();
        this.router.navigateByUrl("/books");

      },
      error => {
        this.loginForm.reset();
        alert("Usuario o contraseña incorrecto")
      });

  }


}
