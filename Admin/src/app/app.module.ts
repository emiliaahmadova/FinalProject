import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './shared/components/layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule } from 'angular-notifier';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SharedModule, LayoutModule, HttpClientModule, NotifierModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
