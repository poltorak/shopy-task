import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { LoaderComponent } from './loader/loader.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, LoaderComponent],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [NavbarComponent, LoaderComponent]
})
export class AppCommonModule { }
