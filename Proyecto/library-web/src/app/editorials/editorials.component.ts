import { Component, OnInit } from '@angular/core';
import {Editorial} from '../models/Editorial';
import { EditorialService } from '../services/editorial.service';

@Component({
  selector: 'app-editorials',
  templateUrl: './editorials.component.html',
  styleUrls: ['./editorials.component.css']
})
export class EditorialsComponent implements OnInit {

  editorials: Editorial[] = [];
  constructor(private editorialService: EditorialService) { }

  ngOnInit(): void {
    this.getEditorial();
  }

  getEditorial():void{
    this.editorialService.getEditorials().subscribe(editorials => this.editorials = editorials)
  }

}
