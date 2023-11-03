import { Pipe, PipeTransform } from '@angular/core';
import { ProductResponse } from '../../../../models/response/product.response';
import { objectContainsValue } from '../../../../shared/utils/api-model-converter.util';

@Pipe({
  name: 'productFilter',
})
export class ProductFilterPipe implements PipeTransform {
  transform(
    products: ProductResponse[],
    page: number = 0,
    pageSize: number = 5,
    search: string = ''
  ): ProductResponse[] {
    if (search.length === 0) return products.slice(page, page + pageSize);

    const filteredProducts = products.filter((product) =>
      objectContainsValue(product, search)
    );
    return filteredProducts.slice(page, page + pageSize);
  }
}
