import { Directive } from "@angular/core";
import {
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const emailValidator = () => {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const valid = EMAIL_PATTERN.test(value);

    return valid ? null : { emailInvalid: true };
  };
};

@Directive({
  selector: "[emailValidator]",
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    },
  ],
})
export class EmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return emailValidator()(control);
  }
}
