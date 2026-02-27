import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseFormComponent } from '@app/shared/components';

const routes: Routes = [
  {
    path: "",
    component: CourseFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseEditRoutingModule { }
