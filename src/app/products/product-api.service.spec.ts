import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Product } from './models';
import { ProductApiService } from './product-api.service';

describe('ProductApiService', () => {
  let httpTestingController: HttpTestingController;
  let service: ProductApiService;

  const mockedProduct = { id: 8, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 };

  const mockedProducts: Product[] = [
    { id: 1, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 },
    { id: 2, name: 'Product 2', price: 60, color: 'red', pantone_value: '15', year: 2000 },
    { id: 3, name: 'Product 3', price: 90, color: 'red', pantone_value: '15', year: 2000 },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductApiService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(ProductApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get list of products', () => {
    service.getAllProducts()
      .subscribe(response => {
        expect(response).toEqual(mockedProducts);
      });

    const req = httpTestingController.expectOne((request) =>
      request.method === 'GET' && request.url === 'https://reqres.in/api/resources'
    );

    req.flush({ data: mockedProducts });

    expect(req.request.params.get('per_page')).toEqual('8');
  });

  it('should get single product with delay param', () => {
    service.getSingleProduct(8)
      .subscribe(response => {
        expect(response).toEqual(mockedProduct);
      });

    const req = httpTestingController.expectOne((request) =>
      request.method === 'GET' && request.url === 'https://reqres.in/api/resources/8'
    );

    req.flush({ data: mockedProduct });

    expect(req.request.params.get('delay')).toEqual('1');
  });
});
