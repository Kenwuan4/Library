import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
<<<<<<< HEAD
import { Auth} from '../models/Auth'
import {By } from '@angular/platform-browser'
=======
import { Auth } from '../models/Auth'
import { By } from "@angular/platform-browser";

>>>>>>> 1f14070 (Documentación frontend)

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have green background', () => {
    const e = fixture.debugElement.query(By.css("#border")).nativeElement;
    expect(getComputedStyle(e).padding).toEqual('32px')
    expect(getComputedStyle(e).marginBottom).toEqual('16px')
  });
 
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Should set submitted to true', (async () => {
    expect(component.onSubmit).toBeTruthy();

  }));
  beforeEach(function () {
    spyOn(console, 'error');
  })

  it('Should call the OnSubmit method', () => {
    (async () => {
      fixture.detectChanges();
      component.loginForm.controls['login'].setValue('test1234');
      component.loginForm.controls['password'].setValue('1234');
      expect(component.onSubmit).toHaveBeenCalledTimes(0);
    })

  });
  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeTruthy();
  });

  it('email field validity', () => {
    let username = component.loginForm.controls['login']
    expect(username.valid).toBeTruthy();
  });

  it('should have green background', () => {
    const e = fixture.debugElement.query(By.css("#border")).nativeElement;
    expect(getComputedStyle(e).padding).toEqual('32px')
    expect(getComputedStyle(e).marginBottom).toEqual('16px')
  });

  it('Form should be valid', (async () => {
    component.loginForm.controls['login'].setValue('test1234');
    component.loginForm.controls['password'].setValue('1234');
    component.onSubmit()
    expect(component.loginForm.valid).toBeTruthy();
  }));
  it('Form should be invalid', (async () => {
    component.loginForm.controls['login'].setValue('test1weewrwer234')
    component.loginForm.controls['password'].setValue('123werwer4')
    component.onSubmit()
  }));

});
