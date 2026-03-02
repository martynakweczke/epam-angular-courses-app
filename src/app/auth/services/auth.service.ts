import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { SessionStorageService } from "./session-storage.service";
import { ApiResponse } from "@app/services/services.types";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string | null;
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly API_URL = "http://localhost:4000";

  private readonly isAuthorized$$ = new BehaviorSubject<boolean>(false);
  public isAuthorized$ = this.isAuthorized$$.asObservable();

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
  ) {
    this.isAuthorized$$.next(this.hasToken());
  }

  login(user: LoginRequest) {
    return this.http.post<ApiResponse<string>>(this.getLoginUrl(), user).pipe(
      tap((response) => {
        this.sessionStorageService.setToken(response.result);
        this.isAuthorized = true;
      }),
    );
  }

  logout() {
    return this.http.delete(this.getLogoutUrl()).pipe(
      tap(() => {
        this.sessionStorageService.deleteToken();
        this.isAuthorized = false;
      }),
      catchError((error) => {
        console.error("Logout error", error);
        this.sessionStorageService.deleteToken();
        this.isAuthorized = false;
        return throwError(() => error);
      }),
    );
  }

  register(user: RegisterRequest) {
    return this.http
      .post<ApiResponse<string>>(this.getRegisterUrl(), user)
      .pipe(
        tap((response) => {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized = true;
        }),
      );
  }

  get isAuthorized(): boolean {
    return this.isAuthorized$$.getValue();
  }

  set isAuthorized(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return `${this.API_URL}/login`;
  }

  getRegisterUrl(): string {
    return `${this.API_URL}/register`;
  }

  getLogoutUrl(): string {
    return `${this.API_URL}/logout`;
  }

  private hasToken(): boolean {
    return !!this.sessionStorageService.getToken();
  }
}
