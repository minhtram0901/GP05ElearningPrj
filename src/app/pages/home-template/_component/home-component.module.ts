import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCourseComponent } from './card-course/card-course.component';
import { PipeModule } from 'src/app/_core/shares/pipe/pipe.module';
import { RouterModule } from '@angular/router';
import { FooterHomeComponent } from './footer-home/footer-home.component';
import { NavbarHomeComponent } from './navbar-home/navbar-home.component';
import { MatIconModule } from '@angular/material/icon';
import { DirectivesModule } from 'src/app/_core/shares/directives/directives.module';
import { FormsModule } from '@angular/forms';
import { ModalLoginComponent } from './navbar-home/modal-login/modal-login.component';
import { ModalRegisterComponent } from './navbar-home/modal-register/modal-register.component';
import { ModalReviewComponent } from './modal-review/modal-review.component';



@NgModule({
  declarations: [
    CardCourseComponent,
    FooterHomeComponent,
    NavbarHomeComponent,
    ModalLoginComponent,
    ModalRegisterComponent,
    ModalReviewComponent,
  ],
  imports: [
    CommonModule,
    PipeModule,
    RouterModule,
    MatIconModule,
    DirectivesModule,
    FormsModule
  ], exports: [
    CardCourseComponent,
    FooterHomeComponent,
    NavbarHomeComponent,
    ModalReviewComponent,


  ]
})
export class HomeComponentModule { }
