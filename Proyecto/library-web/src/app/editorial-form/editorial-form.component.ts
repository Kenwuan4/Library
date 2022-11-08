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

  title:string='';
  edit:boolean=false;
  editorial: Editorial =
  {
    "id": 0,
    "name": '',
    "url":'',
    "webSite":''
  };

  editorialForm = this.formBuilder.group({
    name: '',
    url:'',
    webSite:''
  });

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private editorialService: EditorialService) { }

  ngOnInit(): void {

    if (this.router.url.includes('edit')) {
      this.title = 'Editar';
      this.edit = true;
      this.getEditorialByid();
    }
    else {
      this.title = 'Crear editorial';
    }
  }

  onsumbit():void{
    let name: string = ''+this.editorialForm.value.name;
    let url: string = ''+this.editorialForm.value.url;
    let webSite: string = ''+this.editorialForm.value.webSite;

    if(this.edit){
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.editorialService.putEditorial(id,name,url,webSite).subscribe(
        data => this.editorial = data
      )
    }
    else{
      this.editorialService.postEditorial(name,url,webSite).subscribe(
        data => this.editorial = data
      )
    }
  }

  getEditorialByid(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.editorialService.getEditorialById(id).subscribe(data => this.editorial = data);
  }

}
