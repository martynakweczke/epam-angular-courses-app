import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { User, UserService } from "./user.service";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private readonly name$$ = new BehaviorSubject<string | null>(null);
  private readonly isAdmin$$ = new BehaviorSubject<boolean>(false);

  public name$ = this.name$$.asObservable();
  public isAdmin$ = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}

  getUser() {
    this.userService
      .getUser()
      .pipe(
        tap((user: User) => {
          this.name$$.next(user.name ?? null);
          this.isAdmin$$.next(user.role === "admin");
        }),
      )
      .subscribe();
  }

  get isAdmin() {
    return this.isAdmin$$.getValue();
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
  
}
