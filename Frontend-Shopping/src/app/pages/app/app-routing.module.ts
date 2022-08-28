import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./modules/about/about.module').then((m) => m.AboutModule),
      },
      {
        path: 'contact',
        loadChildren: () =>
          import('./modules/contact/contact.module').then(
            (m) => m.ContactModule
          ),
      },
      {
        path: 'product/:id',
        loadChildren: () =>
          import('./modules/product-detail/product-detail.module').then(
            (m) => m.ProductDetailModule
          ),
      },
      {
        path: 'cart',
        loadChildren: () =>
          import('./modules/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'checkout',
        loadChildren: () =>
          import('./modules/checkout/checkout.module').then(
            (m) => m.CheckoutModule
          ),
      },
      {
        path: 'department',
        loadChildren: () =>
          import('./modules/department-products/department-products.module').then(
            (m) => m.DepartmentProductsModule
          ),
      },
      {
        path: 'collections',
        loadChildren: () =>
          import('./modules/collections/collections.module').then(
            (m) => m.CollectionsModule
          ),
      },
      {
        path: 'category/:id',
        loadChildren: () =>
          import('./modules/category-products/category-products.module').then(
            (m) => m.CategoryProductsModule
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes,)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
