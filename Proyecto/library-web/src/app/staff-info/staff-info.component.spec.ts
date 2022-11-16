import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { StaffInfoComponent } from './staff-info.component';

describe('StaffInfoComponent', () => {
  let component: StaffInfoComponent;
  let fixture: ComponentFixture<StaffInfoComponent>;
  let h1: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffInfoComponent ],
      imports: [HttpClientTestingModule,ReactiveFormsModule,FormsModule]
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
  */
});
