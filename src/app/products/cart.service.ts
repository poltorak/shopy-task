import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './models';

export interface CartState {
  items: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // tslint:disable-next-line
  private readonly _state: BehaviorSubject<CartState>;
  public readonly state$: Observable<CartState>;

  constructor() {
    this._state = new BehaviorSubject({ items: [] });
    this.state$ = this._state.asObservable();
  }

  private set state(data: CartState) {
    this._state.next({ items: data.items });
  }

  public addItem(product: Product): void {
    const currentState = this._state.getValue();
    this._state.next({
      ...currentState,
      items: currentState.items.concat({
        ...product,
        price: Math.round(Math.random() * 100)
      }),
    });
  }
}
