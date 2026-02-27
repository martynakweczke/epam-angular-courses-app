import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CoursesComponent } from "./courses.component";
import { SharedModule } from "@app/shared/shared.module";
import { CoursesRoutingModule } from "./courses-routing.module";
import { CourseInfoModule } from "../course-info/course-info.module";
import { CoursesListModule } from "./courses-list/courses-list.module";

@NgModule({
  declarations: [CoursesComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoursesRoutingModule,
    CoursesListModule,
    CourseInfoModule,
  ],
  exports: [CoursesComponent],
})
export class CoursesModule {}
