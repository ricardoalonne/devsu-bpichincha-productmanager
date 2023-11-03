import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductRequest } from '../models/request/product.request';
import {
  productListMock,
  productListResponseMock,
  productMock,
  productModMock,
  productResponseModMock,
  productResponseMock,
  productRequestMock,
  deletedProductMessageMock,
  messageProductNotDeletedMock,
  productListFilteredMock,
  productListFilteredResponseMock,
} from '../test/mocks/product.mock';

const httpClientMock = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // imports: [HttpClientTestingModule],
      providers: [{ provide: HttpClient, useValue: httpClientMock }],
    });
    service = TestBed.inject(ProductService);
    httpClientMock.post.mockReturnValue(of(productMock));
    httpClientMock.put.mockReturnValue(of(productModMock));
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('debería haberse llamado getProducts()', () => {
    httpClientMock.get.mockReturnValue(of(productListMock));
    service.getProducts();
    expect(httpClientMock.get).toHaveBeenCalled();
  });

  test('debería retornar una lista de productos al usar getProducts()', (done) => {
    httpClientMock.get.mockReturnValue(of(productListMock));
    service.getProducts().subscribe({
      next: (response) => {
        expect(response.length).toBe(3);
        expect(response).toEqual(productListResponseMock);
        done();
      },
    });
  });

  test('debería haberse llamado searchProducts()', () => {
    httpClientMock.get.mockReturnValue(of(productListMock));
    service.searchProducts('trj-crd');
    expect(httpClientMock.get).toHaveBeenCalled();
  });

  test('debería retornar una lista de productos filtrada al usar searchProducts()', (done) => {
    httpClientMock.get.mockReturnValue(of(productListFilteredMock));
    service.searchProducts('trj-crd-1').subscribe({
      next: (response) => {
        expect(response.length).toBe(1);
        expect(response).toEqual(productListFilteredResponseMock);
        done();
      },
    });
  });

  test('debería haberse llamado createdProduct()', () => {
    service.createdProduct(new ProductRequest());
    expect(httpClientMock.post).toHaveBeenCalled();
  });

  test('debería retornar el producto creado al usar createdProduct()', (done) => {
    const request = productRequestMock;

    service.createdProduct(request).subscribe({
      next: (response) => {
        expect(response).toEqual(productResponseMock);
        done();
      },
    });
  });

  test('debería haberse llamado editProduct()', () => {
    service.editProduct(new ProductRequest());
    expect(httpClientMock.put).toHaveBeenCalled();
  });

  test('debería retornar el producto editado al usar editProduct()', (done) => {
    const request = new ProductRequest({
      ...productResponseMock,
      description: 'Tarjeta premium de consumo bajo modalidad de crédito.',
    });

    service.editProduct(request).subscribe({
      next: (response) => {
        expect(response).toEqual(productResponseModMock);
        done();
      },
    });
  });

  test('debería haberse llamado deleteProduct()', () => {
    httpClientMock.delete.mockReturnValue(of(deletedProductMessageMock));
    service.deleteProduct('trj-crd');
    expect(httpClientMock.delete).toHaveBeenCalled();
  });

  test('debería retornar un mensaje de producto eliminado al usar deleteProduct()', (done) => {
    httpClientMock.delete.mockReturnValue(of(deletedProductMessageMock));

    service.deleteProduct('trj-crd').subscribe({
      next: (response) => {
        expect(response).toBe(deletedProductMessageMock);
        done();
      },
    });
  });

  test('debería haberse llamado verificationProduct()', () => {
    httpClientMock.get.mockReturnValue(of(true));
    service.verificationProduct('trj-crd');
    expect(httpClientMock.get).toHaveBeenCalled();
  });

  test('debería retornar true ya que existe el id ingresado al usar verificationProduct()', (done) => {
    httpClientMock.get.mockReturnValue(of(true));

    service.verificationProduct('trj-crd').subscribe({
      next: (response) => {
        expect(response).toBeTruthy();
        done();
      },
    });
  });

  test('debería retornar false ya que no existe el id ingresado al usar verificationProduct()', (done) => {
    httpClientMock.get.mockReturnValue(of(false));

    service.verificationProduct('trj-crd').subscribe({
      next: (response) => {
        expect(response).toBeFalsy();
        done();
      },
    });
  });
});
