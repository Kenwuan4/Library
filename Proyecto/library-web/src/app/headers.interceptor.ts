import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CokieService } from './services/cokie.service';

@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  constructor(private cokieService: CokieService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    if (req.headers.get("skip")){
      req = req.clone({
        headers: req.headers.delete('skip')
    });
      return next.handle(req);
    }

    const authToken = this.cokieService.get("token");
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const request = req.clone({
      headers: req.headers.set('Authorization', 'Bearer '+authToken)
    });

    // send cloned request with header to the next handler.
    return next.handle(request);
  }
}
