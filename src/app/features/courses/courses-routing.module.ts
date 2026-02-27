import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CoursesComponent } from "./courses.component";
import { CourseInfoComponent } from "../course-info/course-info.component";
import { AuthorizedGuard } from "@app/auth/guards/authorized.guard";
import { AdminGuard } from "@app/user/guards/admin.guard";

const routes: Routes = [
  {
    path: "",
    component: CoursesComponent,
  },
  {
    path: "add",
    loadChildren: () =>
      import("./course-add/course-add.module").then((m) => m.CourseAddModule),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
  {
    path: ":id",
    component: CourseInfoComponent,
    canLoad: [AuthorizedGuard],
  },
  {
    path: "edit/:id",
    loadChildren: () =>
      import("./course-edit/course-edit.module").then(
        (m) => m.CourseEditModule,
      ),
    canLoad: [AuthorizedGuard],
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule {}
