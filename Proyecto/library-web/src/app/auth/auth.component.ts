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
    login:'',
    password:'',
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
    userParam = ''+this.loginForm.value.login;
    passParam = ''+this.loginForm.value.password;


    this.authService.login(userParam, passParam).subscribe(
                        (data) => {
                                  
                                  let cookie:string = (data["token"] as string);
                                  this.cokieService.set("cookie",cookie);
                                  console.log(this.cokieService.get("cookie"))
                                  this.loginForm.reset();
                                  this.router.navigateByUrl('/books');
                                },
                        (error) => {
                                  alert("Usuario o contraseña erroneos");
                                  this.loginForm.reset();
                                });

    
    
}

}
