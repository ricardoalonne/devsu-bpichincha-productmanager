import {
  productListMock,
  productListResponseMock,
  productsListFilteredMock,
} from '../../../../test/mocks/product.mock';
import { ProductFilterPipe } from './product-filter.pipe';

describe('ProductFilterPipe', () => {
  let pipe: ProductFilterPipe;

  beforeEach(() => {
    pipe = new ProductFilterPipe();
  });

  test('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  test('debería filtrar y pagina los productos de forma correcta', () => {
    const filtered = pipe.transform(
      productListResponseMock,
      0,
      5,
      'Tarjeta de consumo'
    );

    expect(filtered.length).toBe(2);
    expect(filtered).toEqual(productsListFilteredMock);

    const unfilteredProducts = pipe.transform(productListResponseMock);
    expect(unfilteredProducts).toEqual(productListResponseMock.slice(0, 5));
  });
});
