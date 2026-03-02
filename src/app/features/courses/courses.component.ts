import { Component, OnInit } from "@angular/core";
import { Course } from "./courses.types";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { UserStoreService } from "@app/user/services/user-store.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent implements OnInit {
  constructor(
    private coursesStore: CoursesStoreService,
    private userStore: UserStoreService,
    private router: Router,
  ) {}

  infoButtonText = "Add New Course";
  infoText = "Please use 'Add New Course' button to add your first course";
  infoTitle = "Your List Is Empty";

  courses$ = this.coursesStore.courses$;
  allAuthors$ = this.coursesStore.authors$;

  get isAdmin(): boolean {
    return this.userStore.isAdmin;
  }

  showCourse(clickedCourse: Course) {
    this.router.navigate([`/courses/${clickedCourse.id}`]);
  }

  addCourse() {
    this.router.navigate(["/courses/add"]);
  }

  editCourse(clickedCourse: Course) {
    this.router.navigate([`/courses/edit/${clickedCourse.id}`]);
  }

  deleteCourse(clickedCourse: Course) {
    if (!clickedCourse.id) {
      console.error("Course ID is missing. Cannot delete course.");
      return;
    }

    this.coursesStore.deleteCourse(clickedCourse.id);
  }

  onSearch(searchTerm: string) {
    this.coursesStore.filterCourses(searchTerm);
  }

  ngOnInit() {
    this.coursesStore.getAll();
    this.coursesStore.getAllAuthors();
  }
}
