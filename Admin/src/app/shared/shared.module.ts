import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './components/pagination/pagination.component';
import { NoDataComponent } from './components/no-data/no-data.component';



@NgModule({
  declarations: [
    PaginationComponent,
    NoDataComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PaginationComponent,
    NoDataComponent
  ]
})
export class SharedModule { }
