import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent {
  // Use the name `placeholder` for the @Input.
  @Input() placeholder = "Input Text";
  @Output() search = new EventEmitter<string>();
  searchText = "";

  onSearch() {
    this.search.emit(this.searchText);
  }
  // Use the name `search` for the @Output.
}
