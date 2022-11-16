import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { BooksComponent } from './books.component';
import { DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { BookService } from '../services/book.service';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;
  let el: DebugElement;
  let bookService: BookService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BooksComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    el = fixture.debugElement.query(By.css('a'));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get books at start', () => {
    component.ngOnInit();
    expect(component.books).not.toBeNull();
  });

  it('should see title "resultados" after on sumbit', () => {
    component.onSumbit();
    expect(component.title).not.toBe("Novedades")
  });

  it('should contain books by title', () => {

    component.selected = "Libros"
    expect(component.books).not.toBeNull
  });


  it('should change boolean cokie', () => {
    component.ngDoCheck();
    expect(component.cookie).not.toBe(true)
  });

  it('should get dropdown default value to "Libros" ', () => {
    expect(component.selected).toBe("Libros")
  });



});
