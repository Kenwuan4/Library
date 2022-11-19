import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Editorial } from '../models/Editorial';
import { EditorialService } from '../services/editorial.service';

@Component({
  selector: 'app-editorial-form',
  templateUrl: './editorial-form.component.html',
  styleUrls: ['./editorial-form.component.css']
})
export class EditorialFormComponent implements OnInit {

  title: string = '';
  edit: boolean = false;
  editorial: Editorial =
    {
      "id": 0,
      "name": '',
      "webSite": '',
      "img": ''
    };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editorialService: EditorialService) { }


  /**
   * Obtiene la informacion de la editorial en caso de que la url contenga "edit" y pone el titulo "Editar", en caso de que la url contenga 
   * "create", simplemente se pondra el titulo "Crear editorial"
   */
  ngOnInit(): void {

    if (this.router.url.includes('create')) {
      this.title = 'Crear editorial';
    }
    else {
      this.title = 'Editar';
      this.edit = true;
      this.getEditorialByid();
    }
  }

  /**
   * Obtiene la información que el usuario cambio de la editorial y dependiendo si el usuario edito o creo una editorial, se llama al editorialService
   * con la funcion de editar o crear. Al finalizar se redirecciona al usuario a la pagina principal de editoriales.
   */
  onSubmit(): void {
    let name: string = this.editorial.name;
    let url: string = this.editorial.img;
    let webSite: string = this.editorial.webSite;
    console.log(webSite)
    if (this.edit) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      console.log(this.editorial.img)
      this.editorialService.putEditorial(id, name, url, webSite).subscribe(
        data => this.editorial = data
      )

    }
    else {
      this.editorialService.postEditorial(name, url, webSite).subscribe(
        data => this.editorial = data
      )
    }
    this.router.navigateByUrl("/editorials");
  }

  /**
   * Obtiene la informacion de una editorial dependiendo de su id 
   */
  getEditorialByid(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editorialService.getEditorialById(id).subscribe(data => this.editorial = data);
  }

}
