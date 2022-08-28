import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './components/collections/collections.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CollectionsComponent,
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule,
    SharedModule
  ]
})
export class CollectionsModule { }
