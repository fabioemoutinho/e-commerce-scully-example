import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ScullyLibModule } from '@scullyio/ng-lib';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { NgOptimizedImage, provideImageKitLoader } from '@angular/common';

@NgModule({
  declarations: [AppComponent, HomeComponent, CartComponent],
  imports: [BrowserModule, AppRoutingModule, ScullyLibModule, NgOptimizedImage],
  providers: [provideImageKitLoader('https://ik.imagekit.io/fabioemoutinho')],
  bootstrap: [AppComponent],
})
export class AppModule {}
