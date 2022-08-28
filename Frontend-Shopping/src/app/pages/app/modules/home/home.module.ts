import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './components/home/home.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategorySliderComponent } from './components/category-slider/category-slider.component';
import { GenderSelectionComponent } from './components/gender-selection/gender-selection.component';
import { ProductsSliderComponent } from './components/products-slider/products-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from './components/main-slider/main-slider.component';
import { DepartmentComponent } from './components/department/department.component';
import { ServicesComponent } from './components/services/services.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    BrandsComponent,
    CategorySliderComponent,
    GenderSelectionComponent,
    ProductsSliderComponent,
    MainSliderComponent,
    DepartmentComponent,
    ServicesComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    CarouselModule,
    HttpClientModule,
  ],
})
export class HomeModule {}
