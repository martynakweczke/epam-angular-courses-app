import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { SessionStorageService } from "../services/session-storage.service";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.sessionStorageService.getToken();
    const authRequest = token
      ? request.clone({
          setHeaders: {
            Authorization: token,
          },
        })
      : request;

    return next.handle(authRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(["/login"]);
        }

        return throwError(() => error);
      }),
    );
  }
}
