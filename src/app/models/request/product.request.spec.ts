import { ProductRequest } from './product.request';

describe('ProductRequest', () => {
  test('should create an instance', () => {
    expect(new ProductRequest()).toBeTruthy();
  });

  test('debe inicializar algunas propiedades con valores predeterminados', () => {
    const product = new ProductRequest();

    product.id = '';
    product.name = '';
    product.description = '';

    expect(product.id).toBe('');
    expect(product.name).toBe('');
    expect(product.description).toBe('');
    expect(product.logo).toBe(undefined);
    expect(product.dateRelease).toBe(undefined);
    expect(product.dateRevision).toBe(undefined);
  });

  test('debería inicializar algunas propiedades con los valores proporcionados en el constructor', () => {
    const product = new ProductRequest({
      id: 'trj-crd',
      name: 'Tarjeta de Crédito Visa Signature',
      description: 'Tarjeta de consumo bajo modalidad de crédito.',
      logo: 'visa-signature-400x225.jpg',
    });
    expect(product.id).toBe('trj-crd');
    expect(product.name).toBe('Tarjeta de Crédito Visa Signature');
    expect(product.description).toBe(
      'Tarjeta de consumo bajo modalidad de crédito.'
    );
    expect(product.logo).toBe('visa-signature-400x225.jpg');
    expect(product.dateRelease).toBe(undefined);
    expect(product.dateRevision).toBe(undefined);
  });

  test('debería convertir propiedades a snake_case usando convertCamelToSnake', () => {
    const today = new Date();

    const product = new ProductRequest({
      id: 'trj-crd',
      name: 'Tarjeta de Crédito Visa Signature',
      description: 'Tarjeta de consumo bajo modalidad de crédito.',
      logo: 'visa-signature-400x225.jpg',
      dateRelease: today,
      dateRevision: today,
    });

    const productInSnakeCase = product.toSnakeCase();

    expect(productInSnakeCase.id).toBe('trj-crd');
    expect(productInSnakeCase.name).toBe('Tarjeta de Crédito Visa Signature');
    expect(productInSnakeCase.description).toBe(
      'Tarjeta de consumo bajo modalidad de crédito.'
    );
    expect(productInSnakeCase.logo).toBe('visa-signature-400x225.jpg');
    expect(productInSnakeCase.date_release).toBe(today);
    expect(productInSnakeCase.date_revision).toBe(today);
  });

  test('debería actualizar las propiedades cuando se establezcan valores', () => {
    const today = new Date();

    const product = new ProductRequest({
      id: 'trj-crd',
      name: 'Tarjeta de Crédito Visa Signature',
      description: 'Tarjeta de consumo bajo modalidad de crédito.',
      logo: 'visa-signature-400x225.jpg',
      dateRelease: today,
      dateRevision: today,
    });

    product.name = 'Tarjeta de Crédito Visa Signature Black';
    product.description =
      'Tarjeta premium de consumo bajo modalidad de crédito.';

    expect(product.name).toBe('Tarjeta de Crédito Visa Signature Black');
    expect(product.description).toBe(
      'Tarjeta premium de consumo bajo modalidad de crédito.'
    );
  });
});
