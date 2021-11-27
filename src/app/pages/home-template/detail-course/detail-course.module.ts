import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailCourseRoutingModule } from './detail-course-routing.module';
import { DetailCourseComponent } from './detail-course.component';
import { PipeModule } from 'src/app/_core/shares/pipe/pipe.module';
import { HomeComponentModule } from '../_component/home-component.module';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from 'src/app/_core/shares/directives/directives.module';


@NgModule({
  declarations: [
    DetailCourseComponent
  ],
  imports: [
    CommonModule,
    DetailCourseRoutingModule,
    PipeModule,
    HomeComponentModule,
    MatIconModule,
    DirectivesModule
  ]
})
export class DetailCourseModule { }
