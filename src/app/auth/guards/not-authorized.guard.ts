import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  UrlTree,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authService.isAuthorized) {
      return true;
    } else {
      return this.router.createUrlTree(["/courses"]);
    }
  }
}
