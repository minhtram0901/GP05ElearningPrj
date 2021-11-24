import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_core/shares/material-module';
import { CourseManagementRoutingModule } from './course-management-routing.module';
import { CourseManagementComponent } from './course-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseService } from '../_services/course.service';
import { NotificationService } from 'src/app/_core/shares/notification.service';

@NgModule({
  declarations: [CourseManagementComponent, CourseFormComponent],
  imports: [
    CommonModule,
    CourseManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [CourseService, NotificationService],
  entryComponents: [CourseFormComponent],
})
export class CourseManagementModule {}
