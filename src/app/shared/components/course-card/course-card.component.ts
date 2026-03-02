import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Author, Course } from "@app/features/courses/courses.types";

@Component({
  selector: "app-course-card",
  templateUrl: "./course-card.component.html",
  styleUrls: ["./course-card.component.scss"],
})
export class CourseCardComponent {
  @Input() course!: Course;
  @Input() editable = false;
  @Input() allAuthors!: Author[];

  @Output() clickOnShow = new EventEmitter<void>();

  courseAuthors: string[] = [];

  ngOnChanges() {
    this.courseAuthors = this.allAuthors
      .filter((author) => this.course.authors?.includes(author.id))
      .map((author) => author.name);
  }

  onClickOnShow() {
    this.clickOnShow.emit();
  }
}
