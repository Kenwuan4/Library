import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CokieService } from '../services/cokie.service';
import { EncryptService } from '../services/encrypt.service';

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
    private router: Router,
    private encrypt: EncryptService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    let userParam: string;
    let passParam: string;
    userParam = '' + this.loginForm.value.login;
    passParam = this.encrypt.encryptUsingAES256('' + this.loginForm.value.password);


    this.authService.login(userParam, passParam).subscribe(
      data => {
        this.cokieService.set("token", data.token);
        this.cokieService.set("user", userParam);
        this.loginForm.reset();
        this.router.navigateByUrl("/books");

      },
      error => {
        this.loginForm.reset();
        alert("Usuario o contraseña incorrecto")
      });

  }


}
