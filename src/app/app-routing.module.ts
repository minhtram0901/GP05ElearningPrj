import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/admin-auth/admin-auth.module').then(
        (m) => m.AdminAuthModule
      ),
  },
  // home template
  {
    path: '',
    loadChildren: () =>
      import('./pages/home-template/home-template.module').then(
        (m) => m.HomeTemplateModule
      ),
  },
  // admin template
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin-template/admin-template.module').then(
        (m) => m.AdminTemplateModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
