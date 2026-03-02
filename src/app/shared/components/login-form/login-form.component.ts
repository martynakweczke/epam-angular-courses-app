import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth/services/auth.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { EMPTY } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.scss"],
})
export class LoginFormComponent {
  @ViewChild("loginForm") public loginForm!: NgForm;

  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router,
  ) {}

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    this.authService
      .login({ email, password })
      .pipe(
        tap((response) => {
          if (response.successful) {
          this.userStoreService.getUser();
            this.router.navigate(["/courses"]);
          }
        }),
        catchError((error) => {
          console.error("Login error:", error);
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
