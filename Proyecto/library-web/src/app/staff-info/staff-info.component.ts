import { Component, OnInit } from '@angular/core';
import { Staff } from '../models/Staff';
import { StaffService } from '../services/staff.service';

@Component({
  selector: 'app-staff-info',
  templateUrl: './staff-info.component.html',
  styleUrls: ['./staff-info.component.css']
})
export class StaffInfoComponent implements OnInit {

  staff : Staff[] = []
  constructor(private staffService: StaffService) { }

  ngOnInit(): void {
  }

  getStaff():void{
    this.staffService.getStaff().subscribe(staf  => this.staff = staf);
  }

}
