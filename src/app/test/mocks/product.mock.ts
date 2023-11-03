import { ProductRequest } from '../../models/request/product.request';
import { ProductResponse } from '../../models/response/product.response';
import { snakeToCamelCase } from '../../shared/utils/api-model-converter.util';

const today = new Date();

export const productListMock = [
  {
    id: 'trj-crd-1',
    name: 'Tarjeta de Crédito Visa 1',
    description: 'Tarjeta de consumo bajo modalidad de crédito.',
    logo: 'visa-1-400x225.jpg',
    date_release: today,
    date_revision: today,
  },
  {
    id: 'trj-crd-2',
    name: 'Tarjeta de Crédito Visa 2',
    description: 'Tarjeta premium de consumo bajo modalidad de crédito.',
    logo: 'visa-2-400x225.jpg',
    date_release: today,
    date_revision: today,
  },
  {
    id: 'trj-crd-3',
    name: 'Tarjeta de Crédito Visa 3',
    description: 'Tarjeta de consumo bajo modalidad de crédito.',
    logo: 'visa-3-400x225.jpg',
    date_release: today,
    date_revision: today,
  },
];

export const productListFilteredMock = [
  {
    id: 'trj-crd-1',
    name: 'Tarjeta de Crédito Visa 1',
    description: 'Tarjeta de consumo bajo modalidad de crédito.',
    logo: 'visa-1-400x225.jpg',
    date_release: today,
    date_revision: today,
  },
];

export const productListResponseMock = productListMock.map(
  (product) => snakeToCamelCase(product) as ProductResponse
);

export const productListFilteredResponseMock = productListFilteredMock.map(
  (product) => snakeToCamelCase(product) as ProductResponse
);

export const productMock = {
  id: 'trj-crd',
  name: 'Tarjeta de Crédito Visa Signature',
  description: 'Tarjeta de consumo bajo modalidad de crédito.',
  logo: 'visa-signature-400x225.jpg',
  date_release: today,
  date_revision: today,
};

export const productResponseMock = snakeToCamelCase(
  productMock
) as ProductResponse;

export const productModMock = {
  id: 'trj-crd',
  name: 'Tarjeta de Crédito Visa Signature',
  description: 'Tarjeta premium de consumo bajo modalidad de crédito.',
  logo: 'visa-signature-400x225.jpg',
  date_release: today,
  date_revision: today,
};

export const productResponseModMock = snakeToCamelCase(
  productModMock
) as ProductResponse;

export const productRequestMock = new ProductRequest({
  id: 'trj-crd',
  name: 'Tarjeta de Crédito Visa Signature',
  description: 'Tarjeta de consumo bajo modalidad de crédito.',
  logo: 'visa-signature-400x225.jpg',
  dateRelease: today,
  dateRevision: today,
});

export const deletedProductMessageMock = 'Product successfully removed';
export const messageProductNotDeletedMock = 'Not product found with that id';

export const productsListFilteredMock = [
  {
    id: 'trj-crd-1',
    name: 'Tarjeta de Crédito Visa 1',
    description: 'Tarjeta de consumo bajo modalidad de crédito.',
    logo: 'visa-1-400x225.jpg',
    dateRelease: today,
    dateRevision: today,
  },
  {
    id: 'trj-crd-3',
    name: 'Tarjeta de Crédito Visa 3',
    description: 'Tarjeta de consumo bajo modalidad de crédito.',
    logo: 'visa-3-400x225.jpg',
    dateRelease: today,
    dateRevision: today,
  },
];
