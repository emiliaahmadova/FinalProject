import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';
import { AboutComponent } from './about/about.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { DepartmentComponent } from './department/department.component';
import { OfferComponent } from './offer/offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsComponent } from './settings/settings.component';
import { SettingsSliderComponent } from './settings-slider/settings-slider.component';
import { ProductComponent } from './product/product.component';
import { CreateProductComponent } from './product/create-product/create-product.component';
import { UpdateProductComponent } from './product/update-product/update-product.component';
import { ProductOptionComponent } from './product/product-option/product-option.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
import { BrowserModule } from '@angular/platform-browser';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaleItemsComponent } from './sale-items/sale-items.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    BrandComponent,
    CategoryComponent,
    ContactComponent,
    DepartmentComponent,
    OfferComponent,
    SettingsComponent,
    SettingsSliderComponent,
    ProductComponent,
    CreateProductComponent,
    UpdateProductComponent,
    ProductOptionComponent,
    ProductSliderComponent,
    DashboardComponent,
    SaleItemsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class AppModule { }
