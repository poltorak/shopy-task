import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Product } from '../models';
import { ProductCartComponent } from './product-cart.component';

describe('ProductCartComponent', () => {
  let component: ProductCartComponent;
  let fixture: ComponentFixture<ProductCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCartComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render given amount of products with price and name', () => {
    const products: Product[] = [
      { id: 1, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 },
      { id: 2, name: 'Product 2', price: 60, color: 'red', pantone_value: '15', year: 2000 },
      { id: 3, name: 'Product 3', price: 90, color: 'red', pantone_value: '15', year: 2000 },
    ];
    component.items = products;
    fixture.detectChanges();

    const productElems = fixture.debugElement.queryAll(By.css('.item'));
    expect(productElems[0].nativeElement.textContent).toContain('30Product 1');
    expect(productElems[1].nativeElement.textContent).toContain('60Product 2');
    expect(productElems[2].nativeElement.textContent).toContain('90Product 3');
  });
});
