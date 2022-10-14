import { Component, OnInit } from '@angular/core';
import { Staff } from '../models/Staff';
import { StaffService } from '../services/staff.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staff: Staff[] = [];
  console = console;
  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
    this.getStaff();
  }

  getStaff():void{
    this.staffService.getStaff().subscribe(staf => this.staff = staf);
  }

}
