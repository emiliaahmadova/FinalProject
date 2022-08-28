import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CheckoutFormComponent } from './components/checkout-form/checkout-form.component';
import { CheckoutResultComponent } from './components/checkout-result/checkout-result.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CheckoutComponent, CheckoutFormComponent, CheckoutResultComponent
  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CheckoutModule { }
