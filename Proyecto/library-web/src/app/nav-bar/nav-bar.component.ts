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

  /**
   * Verifica si el usuario esta autenticado. dependiendo de esto se le muestran opciones de inicar sesion o crear cuenta en caso de que no
   * y en el caso contrario opciones de ver perfil y cerrar sesion.
   */
  ngDoCheck(): void {
    if (this.cokieService.get("token").length > 0) {

      this.cerrarSesion = true;
    }
    else {
      this.cerrarSesion = false;
    }
  }

  /**
   * Cierra sesion del usuario y se elimina la informacion del JWT y nombre de usuario. al finalizar se redirecciona a la pagina principal.
   */
  cerrar(): void {
    this.cokieService.delete("token");
    this.cokieService.delete("user");
    this.router.navigateByUrl('/books');
  }

}
