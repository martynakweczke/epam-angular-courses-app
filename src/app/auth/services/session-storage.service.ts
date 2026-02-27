import { Injectable, Inject, InjectionToken } from "@angular/core";

export const WINDOW = new InjectionToken<Window>("WindowToken");

const TOKEN = "SESSION_TOKEN"; 
@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor(@Inject(WINDOW) private window: Window) {}

  setToken(token: string) {
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(): string | null {
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken() {
    this.window.sessionStorage.removeItem(TOKEN);
  }
}
