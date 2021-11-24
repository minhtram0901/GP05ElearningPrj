import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CandeativateGuard } from 'src/app/_core/guards/candeativate.guard';
import { UserManagementComponent } from './user-management.component';

const routes: Routes = [
  {
    path: '',
    component: UserManagementComponent,
    canDeactivate: [CandeativateGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
