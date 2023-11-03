import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductGridComponent } from './product.grid.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { GoogleModule } from '../../../../components/google/google.module';
import { ModalModule } from '../../../../components/modal/modal.module';

describe('ProductGridComponent', () => {
  let component: ProductGridComponent;
  let fixture: ComponentFixture<ProductGridComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductGridComponent],
      imports: [
        FormsModule,
        GoogleModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ModalModule,
      ],
    });
    fixture = TestBed.createComponent(ProductGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
