import { Injectable } from "@angular/core";
import { Author, Course } from "@app/features/courses/courses.types";
import { BehaviorSubject, EMPTY } from "rxjs";
import { CoursesService } from "./courses.service";
import { tap, finalize, map, switchMap } from "rxjs/operators";
import { ApiCourse } from "./courses.service";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private readonly isLoading$$ = new BehaviorSubject<boolean>(false);
  private readonly courses$$ = new BehaviorSubject<Course[]>([]);
  private readonly authors$$ = new BehaviorSubject<Author[]>([]);

  public isLoading$ = this.isLoading$$.asObservable();
  public courses$ = this.courses$$.asObservable();
  public authors$ = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}

  getAll() {
    this.isLoading$$.next(true);

    this.coursesService
      .getAllCourses()
      .pipe(
        map((response): Course[] => {
          if (response.successful) {
            return response.result.map((course) => ({
              ...course,
              creationDate: course.creationDate
                ? new Date(course.creationDate)
                : undefined,
            }));
          }

          return [];
        }),
        tap((courses) => {
          this.courses$$.next(courses);
        }),
        finalize(() => this.isLoading$$.next(false)),
      )
      .subscribe();
  }
  

  createCourse(course: Course) {
    this.isLoading$$.next(true);

    const mappedApiCourse: ApiCourse = {
      ...course,
      creationDate: course.creationDate?.toISOString(),
    };

    this.coursesService
      .createCourse(mappedApiCourse)
      .pipe(
        tap((response) => {
          if (response.successful) {
            this.getAll();
          }
        }),
        finalize(() => this.isLoading$$.next(false)),
      )
      .subscribe();
  }


  getCourse(id: string) {
    this.isLoading$$.next(true);

    return this.coursesService.getCourse(id).pipe(
      map((response): Course | null => {
        if (response.successful) {
          return {
            ...response.result,
            creationDate: response.result.creationDate
              ? new Date(response.result.creationDate)
              : undefined,
          };
        }
        return null;
      }),
      finalize(() => this.isLoading$$.next(false)),
    );
  }


  editCourse(id: string, course: Course) {
    this.isLoading$$.next(true);

    const mappedApiCourse: ApiCourse = {
      ...course,
      creationDate: course.creationDate?.toISOString(),
    };

    this.coursesService
      .editCourse(id, mappedApiCourse)
      .pipe(
        tap((response) => {
          if (response.successful) {
            this.getAll();
          }
        }),
        finalize(() => this.isLoading$$.next(false)),
      )
      .subscribe();
  }


  deleteCourse(id: string) {
    this.isLoading$$.next(true);
    this.coursesService
      .deleteCourse(id)
      .pipe(
        tap((response) => {
          if (response.successful) {
            this.getAll();
          }
        }),
        finalize(() => this.isLoading$$.next(false)),
      )
      .subscribe();
  }


  filterCourses(value: string) {
    if (!value.trim()) {
      this.getAll();
      return;
    }

    this.isLoading$$.next(true);
    this.coursesService
      .filterCourses({ title: [value] })
      .pipe(
        map((response): Course[] => {
          if (response.successful) {
            return response.result.map((course) => ({
              ...course,
              creationDate: course.creationDate
                ? new Date(course.creationDate)
                : undefined,
            }));
          }
          return [];
        }),
        tap((courses) => {
          this.courses$$.next(courses);
        }),
        finalize(() => this.isLoading$$.next(false)),
      )
      .subscribe();
  }


  getAllAuthors() {
    this.isLoading$$.next(true);
    return this.coursesService.getAllAuthors().pipe(
      tap((response) => {
        if (response.successful) {
          this.authors$$.next(response.result);
        }
      }),
      map((response) => (response.successful ? response.result : [])),
      finalize(() => this.isLoading$$.next(false)),
    );
  }


  createAuthor(name: string) {
    this.isLoading$$.next(true);
    this.coursesService
      .createAuthor(name)
      .pipe(
        tap((response) => {
          if (response.successful) {
            const currentAuthors = this.authors$$.getValue();
            const updatedAuthors = [...currentAuthors, response.result];
            this.authors$$.next(updatedAuthors);
          }
        }),
        finalize(() => this.isLoading$$.next(false)),
      )
      .subscribe();
  }

  getAuthorById(id: string) {
    this.isLoading$$.next(true);
    return this.coursesService.getAuthorById(id).pipe(
      map((response) => (response.successful ? response.result : null)),
      finalize(() => this.isLoading$$.next(false)),
    );
  }
}
