import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Course } from "../courses.types";
import { CoursesStoreService } from "@app/services/courses-store.service";


@Component({
  selector: "app-courses-list",
  templateUrl: "./courses-list.component.html",
  styleUrls: ["./courses-list.component.scss"],
})
export class CoursesListComponent {
  constructor(private coursesStore: CoursesStoreService
  ) {}

  @Input() courses!: Course[];
  @Input() editable = false;
  @Output() showCourse = new EventEmitter<Course>();
  @Output() editCourse = new EventEmitter<Course>();
  @Output() deleteCourse = new EventEmitter<Course>();

  allAuthors$ = this.coursesStore.authors$;

  trackByCourseId(index: number, course: Course) {
    return course.id;
  }

  onShowCourse(course: Course) {
    this.showCourse.emit(course);
  }

  onEditCourse(course: Course) {
    this.editCourse.emit(course);
  }

  onDeleteCourse(course: Course) {
    this.deleteCourse.emit(course);
  }
}
