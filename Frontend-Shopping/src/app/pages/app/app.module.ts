import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { LayoutModule } from 'src/app/shared/components/layout/layout.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
  ]
})
export class AppModule { }
