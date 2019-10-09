import { Component, Input } from '@angular/core';
import { Product } from '../models';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss']
})
export class ProductCartComponent {
  @Input()
  public items: Product[];

  constructor() {
    this.items = [];
  }
}
