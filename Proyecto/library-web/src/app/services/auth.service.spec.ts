import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {Token} from 'src/app/models/Token'

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  /*
  it('test register',()=>{
    
    let username = "test1";
    let password = "1234";
    let lastName = "tester"
    let email = "test1@gmail.com"
    let name = "tester1"
    //const body = { "lastName": lastName, "email": email, "firstName": name, "password": password, "userName": userName };
    service.register(lastName,email,name,password,username);
    expect(service).toBeTruthy();
    
  });
  */

  it('test login',()=>{
    
    let username = "test2";
    let password = "1234";
    let token:Token;
    service.login(username,password).subscribe(
      data => 
      {
        expect(data).toBe(token);
      }
    );
  });
});
