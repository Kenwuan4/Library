import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookInfoComponent } from './book-info.component';
import { RouterTestingModule } from "@angular/router/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

describe('BookInfoComponent', () => {
  let component: BookInfoComponent;
  let fixture: ComponentFixture<BookInfoComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookInfoComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
