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


  ngDoCheck(): void {
    if (this.cokieService.get("token").length > 0) {
      this.cookie = true;
    }
    else {
      this.cookie = false;
    }
  }

  ngOnInit(): void {
    this.getEditorial();
  }

  getEditorial(): void {
    this.editorialService.getEditorials().subscribe(editorials => this.editorials = editorials)
  }

  deleteEditorial(id: number): void {
    this.editorialService.deleteEditorial(id);
    this.router.navigateByUrl("/editorials");

  }

}
