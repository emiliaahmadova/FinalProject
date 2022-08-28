import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentProductsRoutingModule } from './department-products-routing.module';
import { DepartmentProductsComponent } from './components/department-products/department-products.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DepartmentComponent } from './components/department/department.component';


@NgModule({
  declarations: [
    DepartmentProductsComponent,
    DepartmentComponent
  ],
  imports: [
    CommonModule,
    DepartmentProductsRoutingModule,
    SharedModule
  ]
})
export class DepartmentProductsModule { }
