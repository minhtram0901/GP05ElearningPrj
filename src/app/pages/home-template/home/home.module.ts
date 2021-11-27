import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { BannerComponent } from './banner/banner.component';
import { ListCourseComponent } from './list-course/list-course.component';
import { HomeComponentModule } from '../_component/home-component.module';


@NgModule({
  declarations: [
    HomeComponent,
    BannerComponent,
    ListCourseComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    HomeComponentModule
  ]
})
export class HomeModule { }
