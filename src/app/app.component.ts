import { Component, OnInit } from "@angular/core";
import { UserStoreService } from "./user/services/user-store.service";
import { AuthService } from "./auth/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  constructor(
    private userStoreService: UserStoreService,
    private authService: AuthService,
    private router: Router,
  ) {}
  title = "courses-app";

  name$ = this.userStoreService.name$;
  isAuthorized$ = this.authService.isAuthorized$;

  ngOnInit() {
    if (this.authService.isAuthorized) {
      this.userStoreService.getUser();
    }
  }

  handleLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.userStoreService.clearUser();
        this.router.navigate(["/login"]);
      },
      error: () => {
        this.userStoreService.clearUser();
        this.router.navigate(["/login"]);
      },
    });
  }

  handleLogin() {
    this.router.navigate(["/login"]);
  }
}
