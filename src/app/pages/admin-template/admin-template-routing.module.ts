import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from 'src/app/_core/guards/auth-admin.guard';
import { AdminTemplateComponent } from './admin-template.component';

const routes: Routes = [
  {
    path: '',
    component: AdminTemplateComponent,
    children: [
      // admin redirect to /admin/dashboard
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, 
      // dashboard
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      // user management
      {
        path: 'user',
        loadChildren: () =>
          import('./user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      // course management
      {
        path: 'course',
        loadChildren: () =>
          import('./course-management/course-management.module').then(
            (m) => m.CourseManagementModule
          ),
      },
    ],
    canActivate: [AuthAdminGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminTemplateRoutingModule {}
