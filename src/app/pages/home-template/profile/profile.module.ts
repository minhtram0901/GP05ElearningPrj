import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { HomeComponentModule } from '../_component/home-component.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    HomeComponentModule,
    FormsModule
  ]
})
export class ProfileModule { }
