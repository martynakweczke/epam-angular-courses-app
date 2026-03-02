import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emailValidator } from "../../directives/email.directive";
import { AuthService } from "@app/auth/services/auth.service";
import { Router } from "@angular/router";
import { catchError, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";
import { UserStoreService } from "@app/user/services/user-store.service";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
  constructor(
    private authService: AuthService,
    private userStoreService: UserStoreService,
    private router: Router,
  ) {}

  registrationForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(6)]),
    email: new FormControl("", [Validators.required, emailValidator()]),
    password: new FormControl("", Validators.required),
  });

  get name() {
    return this.registrationForm.get("name");
  }

  get email() {
    return this.registrationForm.get("email");
  }

  get password() {
    return this.registrationForm.get("password");
  }

  onSubmit(): void {
    if (this.registrationForm.invalid) {
      return;
    }

    const { name, email, password } = this.registrationForm.value;

    if (!email || !password || !name) {
      return;
    }

    this.authService
      .register({
        name,
        email,
        password,
      })
      .pipe(
        tap((response) => {
          if (response.successful) {
            this.userStoreService.getUser();
            this.router.navigate(["/courses"]);
          }
        }),
        catchError((error) => {
          console.error("Registration error:", error);
          return EMPTY;
        }),
      )
      .subscribe();
  }
}
