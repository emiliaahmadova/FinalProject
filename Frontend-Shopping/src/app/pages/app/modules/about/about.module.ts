import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './components/about/about.component';
import { BannerComponent } from './components/banner/banner.component';
import { AboutContentComponent } from './components/about-content/about-content.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AboutComponent,
    BannerComponent,
    AboutContentComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    SharedModule
  ]
})
export class AboutModule { }
