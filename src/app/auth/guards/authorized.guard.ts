import { Injectable } from "@angular/core";
import { CanLoad, Route, UrlSegment, Router, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[],
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.authService.isAuthorized) {
      return true;
    } else {
      return this.router.createUrlTree(["/login"]);
    }
  }
}
