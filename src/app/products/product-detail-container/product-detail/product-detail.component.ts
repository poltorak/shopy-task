import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent {
  @Input()
  public product: Product;

  @Input()
  public isInCart: boolean;

  @Output()
  public addItem: EventEmitter<Product>;

  constructor() {
    this.product = {} as Product;
    this.isInCart = false;
    this.addItem = new EventEmitter();
  }

  public onAddItem(): void {
    this.addItem.emit(this.product);
  }
}
