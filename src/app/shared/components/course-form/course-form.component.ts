import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  Form,
} from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Author } from "@app/features/courses/courses.types";
import { CoursesStoreService } from "@app/services/courses-store.service";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";

type AuthorFormGroup = FormGroup<{
  id: FormControl<string>;
  name: FormControl<string>;
}>;

type NewAuthorFormGroup = FormGroup<{
  name: FormControl<string>;
}>;

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"],
})
export class CourseFormComponent implements OnInit {
  courseForm!: FormGroup;
  isEditMode = false;

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesStore: CoursesStoreService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.courseForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(2)]],
      description: ["", [Validators.required, Validators.minLength(2)]],
      duration: ["", [Validators.required, Validators.min(0)]],
      authors: this.fb.array<AuthorFormGroup>([]),
      courseAuthors: this.fb.array<AuthorFormGroup>([]),
      newAuthor: this.fb.group({
        name: [
          "",
          [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/)],
        ],
      }),
    });

    library.addIconPacks(fas);
  }

  ngOnInit() {
    const courseIdParam = this.route.snapshot.paramMap.get("id");

    this.isEditMode = !!courseIdParam;

    this.coursesStore.getAllAuthors();

    this.coursesStore.authors$.subscribe((authors) => {
      this.authors.clear();

      authors.forEach((author) => {
        const authorGroup = this.fb.group({
          id: [author.id, Validators.required],
          name: [author.name, Validators.required],
        }) as AuthorFormGroup;

        this.authors.push(authorGroup);
      });

      if (courseIdParam) {
        this.loadCourseForEditing(courseIdParam);
      }
    });
  }

  private loadCourseForEditing(id: string) {
    this.coursesStore.getCourse(id).subscribe((course) => {
      if (course) {
        this.courseForm.patchValue({
          title: course.title,
          description: course.description,
          duration: course.duration,
        });

        // Handle Authors: Find full author objects based on IDs in the course
        const allAvailableAuthors = this.authors.controls;

        course.authors.forEach((authorId) => {
          const matchedAuthor = allAvailableAuthors.find(
            (availableAuthorControl) =>
              availableAuthorControl.value.id === authorId,
          );

          if (matchedAuthor) {
            this.addAuthorToCourse(matchedAuthor);
          }
        });
      }
    });
  }

  get title() {
    return this.courseForm.get("title");
  }

  get description() {
    return this.courseForm.get("description");
  }

  get duration() {
    return this.courseForm.get("duration");
  }

  get authors() {
    return this.courseForm.get("authors") as FormArray<AuthorFormGroup>;
  }

  get courseAuthors() {
    return this.courseForm.get("courseAuthors") as FormArray<AuthorFormGroup>;
  }

  get newAuthor() {
    return this.courseForm.get("newAuthor") as NewAuthorFormGroup;
  }

  get newAuthorName() {
    return this.newAuthor.get("name");
  }

  createAuthor() {
    const name = this.newAuthorName?.value?.trim();

    if (!name || this.newAuthor.invalid) {
      return;
    }

    this.coursesStore.createAuthor(name);

    this.newAuthor.reset();
  }

  onCancel() {
    this.courseForm.reset();
    this.router.navigate(["/courses"]);
  }

  onSubmit() {
    if (this.courseForm.invalid) {
      return;
    }

    const { title, description, duration, courseAuthors } =
      this.courseForm.value;

    const courseData = {
      title,
      description,
      duration: Number(duration),
      authors: (courseAuthors as Author[]).map((author) => author.id),
    };

    const courseId = this.route.snapshot.paramMap.get("id");

    if (courseId) {
      this.coursesStore.editCourse(courseId, courseData);
    } else {
      this.coursesStore.createCourse(courseData);
    }

    this.router.navigate(["/courses"]);
  }

  addAuthorToCourse(author: AuthorFormGroup) {
    this.courseAuthors.push(author);
    this.authors.removeAt(
      this.authors.controls.findIndex((a) => a.value.id === author.value.id),
    );
  }

  removeAuthorFromCourse(author: AuthorFormGroup) {
    this.authors.push(author);
    this.courseAuthors.removeAt(
      this.courseAuthors.controls.findIndex(
        (a) => a.value.id === author.value.id,
      ),
    );
  }

  removeAuthorFromList(author: AuthorFormGroup) {
    this.authors.removeAt(
      this.authors.controls.findIndex((a) => a.value.id === author.value.id),
    );
  }

  trackByAuthorId(_: number, author: AuthorFormGroup) {
    return author.value.id;
  }

  // Use the names `title`, `description`, `author`, 'authors' (for authors list), `duration` for the form controls.
}
