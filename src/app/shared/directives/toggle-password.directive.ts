import { Directive, ElementRef } from "@angular/core";

@Directive({
  selector: "[togglePassword]",
  exportAs: "togglePassword",
})
export class TogglePasswordDirective {
  isVisible = false;

  constructor(private el: ElementRef<HTMLInputElement>) {}

  toggle() {
    this.isVisible = !this.isVisible;
    this.el.nativeElement.type = this.isVisible ? "text" : "password";
  }
}
