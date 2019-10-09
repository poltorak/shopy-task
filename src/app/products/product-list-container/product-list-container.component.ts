import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartService, CartState } from '../cart.service';
import { ProductService, ProductsState } from '../product.service';

@Component({
  selector: 'app-product-list-container',
  templateUrl: './product-list-container.component.html'
})
export class ProductListContainerComponent implements OnInit, OnDestroy {
  public state$: Observable<ProductsState>;
  public cartState$: Observable<CartState>;
  public request$: Subscription;

  constructor(private productsState: ProductService, private cartState: CartService) { }

  public ngOnInit(): void {
    this.request$ = this.productsState.getProducts();
    this.state$ = this.productsState.state$;
    this.cartState$ = this.cartState.state$;
  }

  public ngOnDestroy(): void {
    this.request$.unsubscribe();
  }

}
