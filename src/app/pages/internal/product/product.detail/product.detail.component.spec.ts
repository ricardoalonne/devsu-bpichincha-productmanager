import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailComponent } from './product.detail.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModalModule } from '../../../../components/modal/modal.module';
import { DatePipe } from '@angular/common';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule,
      ],
      providers: [DatePipe],
    });
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
