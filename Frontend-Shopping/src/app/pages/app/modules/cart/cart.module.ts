import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { NoteAreaComponent } from './components/note-area/note-area.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    CartComponent,
    ProductTableComponent,
    NoteAreaComponent,
 
  ],
  imports: [CommonModule, CartRoutingModule,SharedModule],
})
export class CartModule {}
