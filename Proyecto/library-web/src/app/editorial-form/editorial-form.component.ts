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

  onSubmit(): void {
    let name: string = this.editorial.name;
    let url: string = this.editorial.img;
    let webSite: string = this.editorial.webSite;

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
  }

  getEditorialByid(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editorialService.getEditorialById(id).subscribe(data => this.editorial = data);
  }

}
