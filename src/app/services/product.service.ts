import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { ProductResponse } from '../models/response/product.response';
import { ProductsApiLink } from '../shared/constants/api-links.constant';
import { ProductRequest } from '../models/request/product.request';
import { errorHandler } from '../shared/utils/error-handler.util';
import {
  objectContainsValue,
  snakeToCamelCase,
} from '../shared/utils/api-model-converter.util';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ProductResponse[]> {
    return this.httpClient.get<ProductResponse[]>(`${ProductsApiLink}`).pipe(
      catchError(errorHandler),
      map((response) =>
        response.map((product) => snakeToCamelCase(product) as ProductResponse)
      )
    );
  }

  searchProducts(input: string): Observable<ProductResponse[]> {
    return this.httpClient.get<ProductResponse[]>(`${ProductsApiLink}`).pipe(
      catchError(errorHandler),
      map((response) =>
        response
          .map((product) => snakeToCamelCase(product) as ProductResponse)
          .filter((product) => objectContainsValue(product, input))
      )
    );
  }

  createdProduct(request: ProductRequest): Observable<ProductResponse> {
    return this.httpClient
      .post<ProductResponse>(`${ProductsApiLink}`, request.toSnakeCase())
      .pipe(
        catchError(errorHandler),
        map((response) => snakeToCamelCase(response) as ProductResponse)
      );
  }

  editProduct(request: ProductRequest): Observable<ProductResponse> {
    return this.httpClient
      .put<ProductResponse>(`${ProductsApiLink}`, request.toSnakeCase())
      .pipe(
        catchError(errorHandler),
        map((response) => snakeToCamelCase(response) as ProductResponse)
      );
  }

  deleteProduct(id: string): Observable<string> {
    return this.httpClient
      .delete<string>(`${ProductsApiLink}?id=${id}`)
      .pipe(catchError(errorHandler));
  }

  verificationProduct(id: string): Observable<boolean> {
    return this.httpClient
      .get<boolean>(`${ProductsApiLink}/verification?id=${id}`)
      .pipe(catchError(errorHandler));
  }
}
