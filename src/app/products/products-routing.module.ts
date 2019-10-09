import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailContainerComponent } from './product-detail-container/product-detail-container.component';
import { ProductListContainerComponent } from './product-list-container/product-list-container.component';

const routes: Routes = [
  {
    path: 'products', children: [
      { path: '', pathMatch: 'full', component: ProductListContainerComponent },
      { path: ':id', component: ProductDetailContainerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
