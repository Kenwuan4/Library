import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { Token } from 'src/app/models/Token'
import { Staff } from 'src/app/models/Staff'
import { StaffComponent } from '../staff/staff.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Auth } from '../models/Auth';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*
  it('test register',()=>{
    let user= {} as Auth;
    user.userName="test12";
    user.password= "1234";
    user.roles=[]
    //const body = { "lastName": lastName, "email": email, "firstName": name, "password": password, "userName": userName };
    service.register(user.lastName,user.email,user.firstName,user.password,user.userName).subscribe(
      data => 
      {
        expect(data).toBe(user);
      }
    );
  });*/

  it('test login', () => {

    let username = "test";
    let password = "1234";
    let token: Token;
    service.login(username, password).subscribe(
      data => {
        expect(data).toBe(token);
      }
    );
  });
});
