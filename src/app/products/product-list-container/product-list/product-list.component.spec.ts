import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Product } from '../../models';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  const mockedProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 },
    { id: 2, name: 'Product 2', price: 60, color: 'red', pantone_value: '15', year: 2000 },
    { id: 3, name: 'Product 3', price: 90, color: 'red', pantone_value: '15', year: 2000 },
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ProductListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-product-item component 3 times', () => {
    component.items = mockedProducts;
    fixture.detectChanges();

    const itemsEl = fixture.debugElement.queryAll(By.css('app-product-item'));
    expect(itemsEl.length).toBe(3);
  });

  it('should bind each product to app-product-item', () => {
    component.items = mockedProducts;
    fixture.detectChanges();

    const itemsEl = fixture.debugElement.queryAll(By.css('app-product-item'));
    expect(itemsEl[0].properties.product).toEqual(mockedProducts[0]);
    expect(itemsEl[1].properties.product).toEqual(mockedProducts[1]);
    expect(itemsEl[2].properties.product).toEqual(mockedProducts[2]);
  });
});
