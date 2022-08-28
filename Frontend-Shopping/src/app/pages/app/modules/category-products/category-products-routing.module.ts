import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryProductsComponent } from './components/category-products/category-products.component';

const routes: Routes = [
  { path: '', component: CategoryProductsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryProductsRoutingModule { }
