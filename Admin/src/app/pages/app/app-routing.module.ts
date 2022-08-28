import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { ChatComponent } from './chat/chat.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { OfferComponent } from './offer/offer.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { SaleItemsComponent } from './sale-items/sale-items.component';
import { SettingsSliderComponent } from './settings-slider/settings-slider.component';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'sale-items/:id', component: SaleItemsComponent },
      { path: 'about', component: AboutComponent },
      { path: 'brand', component: BrandComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'department', component: DepartmentComponent },
      { path: 'offer', component: OfferComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'settings-slider', component: SettingsSliderComponent },
      { path: 'product-slider', component: ProductSliderComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
