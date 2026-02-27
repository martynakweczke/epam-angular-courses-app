import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";

const routes: Routes = [
  {
    path: "login",
    loadChildren: () =>
      import("./features/login/login.module").then((m) => m.LoginModule),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "registration",
    loadChildren: () =>
      import("./features/registration/registration.module").then(
        (m) => m.RegistrationModule,
      ),
    canActivate: [NotAuthorizedGuard],
  },
  {
    path: "courses",
    loadChildren: () =>
      import("./features/courses/courses.module").then((m) => m.CoursesModule),
    canLoad: [AuthorizedGuard],
  },
  { path: "", redirectTo: "courses", pathMatch: "full" },
  { path: "**", redirectTo: "courses" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
