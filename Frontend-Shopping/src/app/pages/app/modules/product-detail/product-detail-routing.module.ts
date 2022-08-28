import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductDetailModule } from './product-detail.module';

const routes: Routes = [
  {
    path: "" , component: ProductDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductDetailRoutingModule { }
