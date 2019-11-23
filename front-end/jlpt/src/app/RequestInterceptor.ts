import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {tap} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.url.includes('/auth/')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + `${this.auth.getToken()}`
        }
      });
    }
    return next.handle(request);
  }
}

