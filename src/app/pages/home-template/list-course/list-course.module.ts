import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListCourseRoutingModule } from './list-course-routing.module';
import { ListCourseComponent } from './list-course.component';


@NgModule({
  declarations: [
    ListCourseComponent
  ],
  imports: [
    CommonModule,
    ListCourseRoutingModule
  ]
})
export class ListCourseModule { }
