import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { StaffInfoComponent } from './staff-info.component';
import { StaffService } from '../services/staff.service';

describe('StaffInfoComponent', () => {
  let component: StaffInfoComponent;
  let fixture: ComponentFixture<StaffInfoComponent>;
  let h1: HTMLElement;
  let staffService: StaffService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
<<<<<<< HEAD
      declarations: [StaffInfoComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
=======
      declarations: [ StaffInfoComponent ],
      imports: [HttpClientTestingModule,ReactiveFormsModule,FormsModule]
>>>>>>> 20edbd9b9b9120b8c24017f9f55c6b73186a203f
    })
      .compileComponents();

    fixture = TestBed.createComponent(StaffInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  /*
  it('no title in the DOM after createComponent()', () => {
    expect(h1.textContent).toEqual('Personal');
  });
<<<<<<< HEAD

  it('should get all the info of the staff', () => {
    let staff
    staffService.getStaff().subscribe(
      data => staff = data
    )
    expect(staff).not.toBeNull()
  })
=======
  */
>>>>>>> 20edbd9b9b9120b8c24017f9f55c6b73186a203f
});
