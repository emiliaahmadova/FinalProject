import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductInfoComponent } from './components/product-info/product-info.component';
import { ProductDetailNavComponent } from './components/product-detail-nav/product-detail-nav.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  declarations: [
    ProductInfoComponent,
    ProductDetailNavComponent,
    ProductDetailComponent,

  ],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    CarouselModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule

  ],
  exports:[
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule

  ]

})
export class ProductDetailModule { }
