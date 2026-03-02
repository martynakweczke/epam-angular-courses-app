import { Component, OnInit } from "@angular/core";
import { Course } from "../courses/courses.types";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { ActivatedRoute, Router } from "@angular/router";
import { combineLatest, map } from "rxjs";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private coursesStore: CoursesStoreService,
  ) {}

  course: Course | null = null;
  courseAuthors: string[] = [];

  ngOnInit() {
    const courseId = this.route.snapshot.paramMap.get("id");

    if (courseId) {
      this.coursesStore.getAllAuthors();

      combineLatest([
        this.coursesStore.getCourse(courseId),
        this.coursesStore.authors$,
      ])
        .pipe(
          map(([course, allAuthors]) => {
            if (!course) {
              return null;
            }

            const courseAuthors = allAuthors
              .filter((author) => course.authors?.includes(author.id))
              .map((author) => author.name);

            return {
              course,
              courseAuthors,
            };
          }),
        )
        .subscribe((pipeData) => {
          if (pipeData) {
            this.course = pipeData.course;
            this.courseAuthors = pipeData.courseAuthors;
          }
        });
    }
  }

  onBackClick() {
    this.router.navigate(["/courses"]);
  }
}
