import { Component, Input } from '@angular/core';
import { Product } from '../../models';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input()
  public items: Product[];

  constructor() {
    this.items = [];
  }
}
