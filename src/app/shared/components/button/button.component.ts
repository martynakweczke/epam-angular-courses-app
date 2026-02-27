import { Component, Input } from "@angular/core";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { faBedPulse, fas } from "@fortawesome/free-solid-svg-icons";
import { IconProp, SizeProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: "app-button",
  templateUrl: "./button.component.html",
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

  // Use the names for the inputs `buttonText` and `iconName`.
  @Input() buttonText = "";
  @Input() iconName?: IconProp;
  @Input() variant: "default" | "outline" = "default";
  @Input() size?: SizeProp;
  @Input() type?: "button" | "submit" | "reset" = "submit";
  @Input() color?: 'default' | 'gray' = 'default';
}
