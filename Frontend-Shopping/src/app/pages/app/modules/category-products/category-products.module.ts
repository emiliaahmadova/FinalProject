import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryProductsRoutingModule } from './category-products-routing.module';
import { CategoryProductsComponent } from './components/category-products/category-products.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CategoryProductsComponent
  ],
  imports: [
    CommonModule,
    CategoryProductsRoutingModule,
    SharedModule
  ]
})
export class CategoryProductsModule { }
