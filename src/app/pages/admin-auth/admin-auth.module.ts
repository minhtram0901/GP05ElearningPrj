import { MaterialModule } from '../../_core/shares/material-module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { AdminAuthRoutingModule } from './admin-auth-routing.module';
import { AdminAuthComponent } from './admin-auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminAuthComponent],
  imports: [
    CommonModule,
    AdminAuthRoutingModule,
    MaterialModule,
    // FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminAuthModule {}
