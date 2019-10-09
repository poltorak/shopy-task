import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppCommonModule } from '../common/common.module';
import { ProductCartComponent } from './product-cart/product-cart.component';
import { ProductDetailContainerComponent } from './product-detail-container/product-detail-container.component';
import { ProductDetailComponent } from './product-detail-container/product-detail/product-detail.component';
import { ProductItemComponent } from './product-list-container/product-item/product-item.component';
import { ProductListContainerComponent } from './product-list-container/product-list-container.component';
import { ProductListComponent } from './product-list-container/product-list/product-list.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductListContainerComponent,
    ProductCartComponent,
    ProductListComponent,
    ProductItemComponent,
    ProductDetailComponent,
    ProductDetailContainerComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    AppCommonModule,
  ]
})
export class ProductsModule { }
