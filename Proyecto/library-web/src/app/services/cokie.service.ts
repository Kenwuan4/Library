import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CokieService {

  constructor(private cookieService: CookieService) { }

  set(name:string, cookie:string):void{
    this.cookieService.set(name, cookie);
  }

  get(name:string):string{
    return this.cookieService.get(name);
  }

  delete(name:string):void{
    this.cookieService.delete(name);
  }
}

