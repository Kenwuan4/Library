import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StaffService } from './staff.service';

describe('StaffService', () => {
  let service: StaffService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StaffService]
    });
    service = TestBed.inject(StaffService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all the info of the staff', () => {
    let staff
    service.getStaff().subscribe(
      data => staff = data
    )
    expect(staff).not.toBeNull()
  });

  it('should change estatus of personal', () => {
    let staff
    service.changeStatus(4).subscribe(
      data => staff = data
    )
    expect(staff).not.toBeNull()

  })

  it('should get the info of a person by id ', () => {
    let staff
    service.getStaffById(2).subscribe(
      data => staff = data
    )
    expect(staff).not.toBeNull()

  })

  it('should create a new staff ', () => {
    let staff
    let date = '16/11/2022'
    service.registerStaff("pruebaTest", "pruebaTest", "pruebaTest@test.com", 1234, new Date(date), true).subscribe(
      data => staff = data
    )
    expect(staff).not.toBeNull()

  })
  it('should update staff with id #4 ', () => {
    let staff
    let date = '16/11/2022'
    service.updateStaff(4, "pruebaTest", "pruebaTest", "pruebaTest@test.com", 1234, new Date(date), true).subscribe(
      data => staff = data
    )
    expect(staff).not.toBeNull()

  })
});
