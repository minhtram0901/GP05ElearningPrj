import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_core/shares/material-module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [CommonModule, UserManagementRoutingModule, MaterialModule],
})
export class UserManagementModule {}
