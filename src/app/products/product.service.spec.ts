import { TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductApiService } from './product-api.service';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let MockedProductApiService: ProductApiService;
  const mockedProduct = { id: 1, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 };

  beforeEach(() => {
    MockedProductApiService = {
      getAllProducts: jasmine.createSpy('getAllProducts')
        .and.returnValue(of([mockedProduct])),
      getSingleProduct: jasmine.createSpy('getSingleProduct')
        .and.returnValue(of(mockedProduct)),
    } as any as ProductApiService;

    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        { provide: ProductApiService, useValue: MockedProductApiService }
      ]
    });
    service = TestBed.get(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /* I know this is bad test, it should be done with marbles, but didn't have enough time for them */
  describe('#getProducts', () => {
    it('should call productsApi.getAllProducts and set returned products to state', () => {
      service.getProducts();

      service.state$.subscribe(data => {
        expect(data.products.items).toEqual([mockedProduct]);
      });

      expect(MockedProductApiService.getAllProducts).toHaveBeenCalled();
    });
  });

  describe('#getProduct', () => {
    it('should call productsApi.getProduct and set returned products to state', () => {
      service.getProduct(1);

      service.state$.subscribe(data => {
        expect(data.product.item).toEqual(mockedProduct);
      });

      expect(MockedProductApiService.getSingleProduct).toHaveBeenCalledWith(1);
    });
  });
});
