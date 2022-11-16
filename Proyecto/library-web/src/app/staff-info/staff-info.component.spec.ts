import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StaffInfoComponent } from './staff-info.component';
import { StaffService } from '../services/staff.service';

describe('StaffInfoComponent', () => {
  let component: StaffInfoComponent;
  let fixture: ComponentFixture<StaffInfoComponent>;
  let h1: HTMLElement;
  let staffService: StaffService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffInfoComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule, FormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StaffInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change status ', () => {
    expect(component.onSubmit).toBeTruthy();
  })

  it('correct init ', () => {
    expect(component.ngOnInit).toBeTruthy();
  })
});
