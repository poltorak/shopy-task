import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  const mockedProduct = { id: 1, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 };

  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product color, name, pantone value and year', () => {
    component.product = mockedProduct;
    fixture.detectChanges();

    const colorEl = fixture.debugElement.query(By.css('.product__body'));
    const nameEl = fixture.debugElement.query(By.css('.caption__title'));
    const detailEl = fixture.debugElement.query(By.css('.caption__detail'));

    expect(colorEl.nativeElement.textContent).toContain('red');
    expect(nameEl.nativeElement.textContent).toContain('Product 1');
    expect(detailEl.nativeElement.textContent).toContain('15 - 2000');
  });
});
