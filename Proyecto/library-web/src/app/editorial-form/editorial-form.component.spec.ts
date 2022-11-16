import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { EditorialFormComponent } from './editorial-form.component';

describe('EditorialFormComponent', () => {
  let component: EditorialFormComponent;
  let fixture: ComponentFixture<EditorialFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorialFormComponent ],
      imports: [HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorialFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
