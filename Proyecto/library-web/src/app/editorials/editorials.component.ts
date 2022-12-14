import { Component, OnInit } from '@angular/core';
import { Editorial } from '../models/Editorial';
import { EditorialService } from '../services/editorial.service';
import { CokieService } from '../services/cokie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editorials',
  templateUrl: './editorials.component.html',
  styleUrls: ['./editorials.component.css']
})
export class EditorialsComponent implements OnInit {

  editorials: Editorial[] = [];
  public cookie: boolean = false;

  constructor(private editorialService: EditorialService,
    private cokieService: CokieService,
    private router: Router) { }

  /**
   * Verifica si el usuario se auntetico, si lo hizo se genera un boton para crear, editar o eliminar una editorial,  
   */
  ngDoCheck(): void {
    if (this.cokieService.get("token").length > 0) {
      this.cookie = true;
    }
    else {
      this.cookie = false;
    }
  }

  ngOnInit(): void {
    this.getEditorials();
  }

  /**
   * Obtiene la informacion de todas las editoriales
   */
  getEditorials(): void {
    this.editorialService.getEditorials().subscribe(editorials => this.editorials = editorials)
  }

  /**
   * Elimina la editorial seleccionada
   * @param {number}id: Id de la editorial 
   */
  deleteEditorial(id: number): void {
    console.log(id)
    this.editorialService.deleteEditorial(id).subscribe();
  }

}
