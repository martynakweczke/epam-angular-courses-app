import { Component } from "@angular/core";
import { mockedCoursesList } from "@app/shared/mocks/mocks";
import { Course } from "./courses.types";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.scss"],
})
export class CoursesComponent {
  infoButtonText = "Add New Course";
  infoText = "Please use 'Add New Course' button to add your first course";
  infoTitle = "Your List Is Empty";

  courses = mockedCoursesList.map((course) => ({
    ...course,
    creationDate: new Date(course.creationDate),
  }));

  selectedCourse: Course | null = null;

  closeSelectedCourse() {
    this.selectedCourse = null;
  }

  showCourse(clickedCourse: Course) {
    this.selectedCourse = clickedCourse;
  }

  editCourse(clickedCourse: Course) {
    console.log("Edit course:", clickedCourse);
  }

  deleteCourse(clickedCourse: Course) {
    this.courses = this.courses.filter(
      (course) => course.id !== clickedCourse.id,
    );
  }

  onSearch(searchTerm: string) {
    console.log("Search term:", searchTerm);
  }
}
