import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiResponse } from "@app/services/services.types";

export type User = {
  id: string;
  name: string | null;
  email: string;
  role: "admin" | "user";
};

@Injectable({
  providedIn: "root",
})
export class UserService {
  private readonly API_URL = "http://localhost:4000";
  constructor(private http: HttpClient) {}

  getUser() {
    return this.http.get<ApiResponse<User>>(`${this.API_URL}/users/me`);
  }
}
