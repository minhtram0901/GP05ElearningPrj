import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_core/shares/material-module';
import { CourseManagementRoutingModule } from './course-management-routing.module';
import { CourseManagementComponent } from './course-management.component';

@NgModule({
  declarations: [CourseManagementComponent],
  imports: [CommonModule, CourseManagementRoutingModule, MaterialModule],
})
export class CourseManagementModule {}
