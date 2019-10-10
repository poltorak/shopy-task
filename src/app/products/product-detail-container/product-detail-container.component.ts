import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, forkJoin, Observable, of, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { CartService, CartState } from '../cart.service';
import { Product } from '../models';
import { ProductService, ProductsState } from '../product.service';

@Component({
  selector: 'app-product-detail-container',
  templateUrl: './product-detail-container.component.html',
 })
export class ProductDetailContainerComponent implements OnInit, OnDestroy {
  public state$: Observable<ProductsState>;
  public cartState$: Observable<CartState>;
  public request$: Subscription;
  constructor(
    private productsState: ProductService,
    private cartState: CartService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    const id = +this.route.snapshot.params.id;
    this.request$ = this.productsState.getProduct(id);
    this.state$ = this.productsState.state$;
    this.cartState$ = this.cartState.state$;
  }

  public ngOnDestroy(): void {
    this.request$.unsubscribe();
  }

  public onAddItem(product: Product): void {
    this.cartState.addItem(product);
  }

  public isProductInCart(): Observable<boolean> {
    return combineLatest(
      this.state$,
      this.cartState$
    ).pipe(
      take(1),
      map(([productState, cartState]) => ({ product: productState.product.item, cart: cartState.items})),
      map(({ product, cart }) => !!cart.find(item => item.id === product.id ))
    );
  }

}
