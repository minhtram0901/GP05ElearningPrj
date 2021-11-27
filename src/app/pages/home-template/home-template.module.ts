import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeTemplateRoutingModule } from './home-template-routing.module';
import { HomeTemplateComponent } from './home-template.component';
import { HomeComponentModule } from './_component/home-component.module';



@NgModule({
  declarations: [
    HomeTemplateComponent,
  ],
  imports: [
    CommonModule,
    HomeTemplateRoutingModule,
    HomeComponentModule
  ]
})
export class HomeTemplateModule { }
