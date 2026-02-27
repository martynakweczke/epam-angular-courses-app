import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { ApiResponse } from "./services.types";
import { Author } from "@app/features/courses/courses.types";

export type ApiCourse = {
  id?: string;
  title: string;
  description: string;
  creationDate?: string;
  duration: number;
  authors: string[];
};

type CourseFilter = {
  duration?: string[];
  creationDate?: string[];
  description?: string[];
  title?: string[];
};

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  private readonly API_URL = "http://localhost:4000/api";

  constructor(private http: HttpClient) {}

  getAllCourses() {
    return this.http.get<ApiResponse<ApiCourse[]>>(
      `${this.API_URL}/courses/all`,
    );
  }

  createCourse(course: ApiCourse) {
    return this.http.post<ApiResponse<string>>(
      `${this.API_URL}/courses/add`,
      course,
    );
  }

  editCourse(id: string, course: ApiCourse) {
    return this.http.put<ApiResponse<ApiCourse>>(
      `${this.API_URL}/courses/${id}`,
      course,
    );
  }

  getCourse(id: string) {
    return this.http.get<ApiResponse<ApiCourse>>(
      `${this.API_URL}/courses/${id}`,
    );
  }

  deleteCourse(id: string) {
    return this.http.delete<ApiResponse<string>>(
      `${this.API_URL}/courses/${id}`,
    );
  }

  filterCourses(courseFilter: CourseFilter) {
    return this.http.get<ApiResponse<ApiCourse[]>>(
      `${this.API_URL}/courses/filter`,
      {
        params: new HttpParams({
          fromObject: courseFilter,
        }),
      },
    );
  }

  getAllAuthors() {
    return this.http.get<ApiResponse<Author[]>>(`${this.API_URL}/authors/all`);
  }

  createAuthor(name: string) {
    return this.http.post<ApiResponse<Author>>(`${this.API_URL}/authors/add`, {
      name,
    });
  }

  getAuthorById(id: string) {
    return this.http.get<ApiResponse<Author>>(`${this.API_URL}/authors/${id}`);
  }
}
