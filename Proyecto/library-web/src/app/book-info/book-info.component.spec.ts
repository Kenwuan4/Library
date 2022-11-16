import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BookInfoComponent } from './book-info.component';
import { RouterTestingModule } from "@angular/router/testing";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core"; 

describe('BookInfoComponent', () => {
  let component: BookInfoComponent;
  let fixture: ComponentFixture<BookInfoComponent>;
  let el: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookInfoComponent ],
      imports: [ReactiveFormsModule, HttpClientTestingModule,RouterTestingModule]
    })
    .compileComponents();
    el = fixture.debugElement.query(By.css('a'));
    fixture = TestBed.createComponent(BookInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('')?.textContent).toContain('Editar');
    });

    it('component should be created', (async() => {
          const app = fixture.debugElement.componentInstance;
          expect(app).toBeTruthy();
      }));
  it('login button hidden when the user is authenticated', () => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Editar');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
