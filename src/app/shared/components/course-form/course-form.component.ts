import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray,
  Form,
} from "@angular/forms";
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

  mockedAuthors = [
    { id: "1", name: "J.K. Rowling" },
    { id: "2", name: "George R.R. Martin" },
  ];

  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
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
    this.mockedAuthors.forEach((author) => {
      const authorGroup = this.fb.group({
        id: [author.id, Validators.required],
        name: [author.name, Validators.required],
      }) as AuthorFormGroup;

      this.authors.push(authorGroup);
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

    const newAuthorGroup = this.fb.group({
      id: [crypto.randomUUID()],
      name: [name, Validators.required],
    }) as AuthorFormGroup;

    this.authors.push(newAuthorGroup);

    this.newAuthor.reset();
  }

  onSubmit() {
    console.log(this.courseForm.value);

    if (this.courseForm.invalid) {
      return;
    }
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
