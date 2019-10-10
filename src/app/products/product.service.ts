import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './models';
import { ProductApiService } from './product-api.service';

export interface ProductsState {
  products: {
    isLoading: boolean;
    items: Product[];
  };
  product: {
    isLoading: boolean;
    item: Product;
  };
}

const initialState: ProductsState = {
  products: {
    isLoading: false,
    items: [],
  },
  product: {
    isLoading: false,
    item: {} as Product,
  }
};

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // tslint:disable-next-line
  private readonly _state: BehaviorSubject<ProductsState>;
  public readonly state$: Observable<ProductsState>;

  constructor(private productsApi: ProductApiService) {
    this._state = new BehaviorSubject(initialState);
    this.state$ = this._state.asObservable();
  }

  private set state(data: ProductsState) {
    this._state.next(data);
  }

  public getProducts(): Subscription {
    const currentState = this._state.getValue();
    this.state = {
      ...currentState,
      products: {
        ...currentState.products,
        isLoading: true
      }
    };

    return this.productsApi.getAllProducts()
      .pipe(
        map((products) => {
          this.state = {
            ...currentState,
            products: {
              isLoading: false,
              items: products,
            }
          };
        }),
      ).subscribe();
  }

  public getProduct(id: number): Subscription {
    const currentState = this._state.getValue();
    this.state = {
      ...currentState,
      product: {
        item: {} as Product,
        isLoading: true
      }
    };

    return this.productsApi.getSingleProduct(id)
      .pipe(
        map((product) => {
          this.state = {
            ...currentState,
            product: {
              isLoading: false,
              item: product,
            }
          };
        })
      ).subscribe();
  }
}
