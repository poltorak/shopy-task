import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CartService, CartState } from '../cart.service';
import { Product } from '../models';
import { ProductService, ProductsState } from '../product.service';
import { ProductListContainerComponent } from './product-list-container.component';

describe('ProductListContainerComponent', () => {
  let component: ProductListContainerComponent;
  let fixture: ComponentFixture<ProductListContainerComponent>;

  let MockedProductsService: ProductService;
  let productState$: BehaviorSubject<ProductsState>;
  let MockedCartService: CartService;
  let cartState$: BehaviorSubject<CartState>;
  let MockedRoute: ActivatedRoute;
  let requestSubject: Subscription;

  const mockedProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 },
    { id: 2, name: 'Product 2', price: 60, color: 'red', pantone_value: '15', year: 2000 },
    { id: 3, name: 'Product 3', price: 90, color: 'red', pantone_value: '15', year: 2000 },
  ];

  beforeEach(async(() => {
    requestSubject = new Subscription();
    productState$ = new BehaviorSubject({
      products: { isLoading: false, items: [] },
      product: { isLoading: false, item: {} as Product },
    });

    cartState$ = new BehaviorSubject({ items: [] });

    MockedRoute = {
      snapshot: {
        params: { id: 8 }
      }
    } as any as ActivatedRoute;

    MockedCartService = {
      state$: cartState$,
      addItem: jasmine.createSpy('addItem'),
    } as any as CartService;

    MockedProductsService = {
      state$: productState$,
      getProducts: jasmine.createSpy()
        .and.returnValue(requestSubject)
    } as any as ProductService;

    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ProductListContainerComponent],
      providers: [
        { provide: ProductService, useValue: MockedProductsService },
        { provide: CartService, useValue: MockedCartService },
        { provide: ActivatedRoute, useValue: MockedRoute },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set loader show property to true', () => {
    productState$.next({
      products: { isLoading: true, items: mockedProducts },
      product: { isLoading: false, item: {} as Product }
    });

    fixture.detectChanges();
    const loaderEl = fixture.debugElement.query(By.css('app-loader'));
    expect(loaderEl.properties.show).toBe(true);
  });
});
