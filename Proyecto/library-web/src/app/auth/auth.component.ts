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

  /**
   * Empelado para obtener usuario y contraseña de la persona
   */
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


  /**
   * Se obtiene la informacion del form y es enviado al auth service donde se autentica el usuario.
   * Si el usuario es autenticado se le redirecciona a la pagina principal, si no se le manda una alerta de usuario o contraseña incorrecta
   */

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
