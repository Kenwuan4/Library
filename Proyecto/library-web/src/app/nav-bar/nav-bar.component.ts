import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CokieService } from '../services/cokie.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  title: string = '';
  public cerrarSesion: boolean = false;


  constructor(private cokieService: CokieService,
    private router: Router) { }

  ngOnInit(): void {

  }

  ngDoCheck(): void {
    if (this.cokieService.get("token").length > 0) {

      this.cerrarSesion = true;
    }
    else {
      this.cerrarSesion = false;
    }
  }


  cerrar(): void {
    this.cokieService.delete("token");
    this.cokieService.delete("user");
    this.router.navigateByUrl('/books');
  }

}
