import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeTemplateComponent } from './home-template.component';

const routes: Routes = [
  {
    path: '',
    component: HomeTemplateComponent,
    children: [
      // home
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      // list-course
      {
        path: 'list-course',
        loadChildren: () =>
          import('./list-course/list-course.module').then(
            (m) => m.ListCourseModule
          ),
      },
      // detai-course
      {
        path: 'detail/:id',
        loadChildren: () =>
          import('./detail-course/detail-course.module').then(
            (m) => m.DetailCourseModule
          ),
      },
      // my-page
      {
        path: 'my-page',
        loadChildren: () =>
          import('./my-page/my-page.module').then((m) => m.MyPageModule),
      },
      // search-page
      {
        path: "search",
        loadChildren: () =>
          import("./search/search.module").then(m => m.SearchModule)
      },
      {
        path: "category/:id",
        loadChildren: () => import("./category/category.module").then(m => m.CategoryModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTemplateRoutingModule { }
