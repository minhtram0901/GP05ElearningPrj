import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search.component';
import { PipeModule } from 'src/app/_core/shares/pipe/pipe.module';
import { HomeComponentModule } from '../_component/home-component.module';


@NgModule({
  declarations: [
    SearchComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    PipeModule,
    HomeComponentModule
  ]
})
export class SearchModule { }
