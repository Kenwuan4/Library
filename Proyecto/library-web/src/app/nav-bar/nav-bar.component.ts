import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CokieService } from '../services/cokie.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title:string='';
  public cerrarSesion: boolean = false;
  searchForm = this.formBuilder.group({
    search:''
  });

  constructor(private cokieService: CokieService,
              private router: Router,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }
  ngDoCheck():void{
    if (this.cokieService.get("cookie").length > 0){
      this.cerrarSesion = true;
    }
    else{
      this.cerrarSesion = false;
    }
  }
  onSumbit(){

  }
  cerrar():void{
    this.cokieService.delete("cookie");
    this.router.navigateByUrl('/books');
  }

}
