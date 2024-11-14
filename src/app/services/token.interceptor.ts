import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const excludedUrls = ["/login", "/register", "/verifyEmail"];
    
    const isExcluded = excludedUrls.some(url => request.url.includes(url));

    if (!isExcluded) {
      const jwt = this.authService.getToken();
      const reqWithToken = request.clone({
        setHeaders: { Authorization: "" + jwt }
      });
      return next.handle(reqWithToken);
    }

    return next.handle(request);
}


}

