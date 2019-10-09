import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../models';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input()
  public product: Partial<Product>;
  constructor() {
    this.product = {};
  }
}
