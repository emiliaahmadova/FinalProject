import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { DiscoverButtonComponent } from './components/discover-button/discover-button.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { FilterOptionHeaderComponent } from './components/filter-option-header/filter-option-header.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductCollectionComponent } from './components/product-collection/product-collection.component';
import { RouterModule } from '@angular/router';
import { TotalPricePipe } from './pipes/total-price.pipe';
import { TotalProductPricePipe } from './pipes/total-product-price.pipe';



@NgModule({
  declarations: [
    ProductCardComponent,
    DiscoverButtonComponent,
    BreadcrumbComponent,
    FilterOptionHeaderComponent,
    FilterComponent,
    ProductCollectionComponent,
    TotalPricePipe,
    TotalProductPricePipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    ProductCardComponent,
    DiscoverButtonComponent,
    BreadcrumbComponent,
    FilterOptionHeaderComponent,
    FilterComponent,
    TotalPricePipe,
    TotalProductPricePipe
  ]
})
export class SharedModule { }
