import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { emailValidator } from "../../directives/email.directive";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.scss"],
})
export class RegistrationFormComponent {
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

    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;
    const name = this.registrationForm.value.name;
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Name:", name);

    // Use the names `name`, `email`, `password` for the form controls.
  }

  onLogin() {
    console.log("Navigate to login page");
  }
}
