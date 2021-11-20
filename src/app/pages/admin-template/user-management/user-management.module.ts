import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/_core/shares/material-module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from '../_services/user.service';

@NgModule({
  declarations: [UserManagementComponent, UserFormComponent, UserFormComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2OrderModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
  ],
  providers: [
    UserService
  ],
  entryComponents: [UserFormComponent],
})
export class UserManagementModule {}
