import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CokieService {

  constructor(private cookieService: CookieService) { }

  /**
   * Almacena informacion en una cookie 
   * @param name nombre a poner a la cookie
   * @param cookie informacion a poner en la cookie
   */
  set(name: string, cookie: string): void {
    this.cookieService.set(name, cookie);
  }

  /**
   * Obtiene la informacion contenida dentro de una cookie 
   * @param name nombre de la cookie
   * @returns {String} name
   */
  get(name: string): string {
    return this.cookieService.get(name);
  }

  /**
   * Elimina la informacion contenida dentro de una cookie
   * @param name nombre de la cookie
   */
  delete(name: string): void {
    this.cookieService.delete(name);
  }
}

