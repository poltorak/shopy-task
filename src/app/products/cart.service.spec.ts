import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';

describe('CartService', () => {
  const mockedProduct = { id: 1, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 };

  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should append item to state items', () => {
    service.addItem(mockedProduct);

    service.state$.subscribe(data => {
      // due to random price I had to remove it from checking
      const expectedItems = data.items.map(item => {
        const { price, ...rest } = item;
        return rest;
      });
      const { price: mockPrice, ...mockedRest } = mockedProduct;

      expect(expectedItems).toEqual([mockedRest]);
    });
  });
});
