import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './components/contact/contact.component';
import { ContactInfoComponent } from './components/contact-info/contact-info.component';
import { MapComponent } from './components/map/map.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ContactComponent,
    ContactInfoComponent,
    MapComponent,
  ],
  imports: [
    CommonModule,
    ContactRoutingModule,
    SharedModule
  ]
})
export class ContactModule { }
