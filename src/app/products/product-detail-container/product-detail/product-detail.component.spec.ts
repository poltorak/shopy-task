import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Product } from '../../models';
import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  const mockedProduct = { id: 1, name: 'Product 1', price: 30, color: 'red', pantone_value: '15', year: 2000 };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Loading" when product color is not available', () => {
    component.product = {} as Product;
    fixture.detectChanges();

    const bodyEl = fixture.debugElement.query(By.css('.product-detail__body'));

    expect(bodyEl.nativeElement.textContent).toContain('Loading');
  });

  it('should display product color, name, id, pantone value and year', () => {
    component.product = mockedProduct;
    fixture.detectChanges();

    const colorEl = fixture.debugElement.query(By.css('.product-detail__body'));
    const nameEl = fixture.debugElement.query(By.css('.caption__title'));
    const detailsEl = fixture.debugElement.query(By.css('.caption__details'));
    const idEl = detailsEl.nativeElement.children[0];
    const pantonEl = detailsEl.nativeElement.children[2];
    const yearEl = detailsEl.nativeElement.children[3];

    expect(colorEl.nativeElement.textContent).toContain('red');
    expect(nameEl.nativeElement.textContent).toContain('Product 1');
    expect(idEl.textContent).toContain('1');
    expect(pantonEl.textContent).toContain('15');
    expect(yearEl.textContent).toContain('2000');
  });

  it('should show button with text "Add to cart" when isInCart is falsy', () => {
    component.product = mockedProduct;
    component.isInCart = null;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('.caption__button'));
    expect(buttonEl.nativeElement.textContent).toContain('Add to cart');
  });

  it('should show disabled button with text "Added" when isInCart is true', () => {
    component.product = mockedProduct;
    component.isInCart = true;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('.caption__button'));
    expect(buttonEl.nativeElement.textContent).toContain('Added');
    expect(buttonEl.properties.disabled).toBe(true);
  });

  it('should call addItem.emit when add to cart button is clicked', () => {
    component.addItem.emit = jasmine.createSpy('emit');

    component.product = mockedProduct;
    component.isInCart = false;
    fixture.detectChanges();

    const buttonEl = fixture.debugElement.query(By.css('.caption__button'));
    buttonEl.triggerEventHandler('click', null);
    expect(component.addItem.emit).toHaveBeenCalledWith(mockedProduct);
  });
});
