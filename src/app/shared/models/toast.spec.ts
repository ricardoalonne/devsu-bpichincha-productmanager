import { Toast } from './toast';

describe('Toast', () => {
  test('should create an instance', () => {
    expect(new Toast()).toBeTruthy();
  });

  test('debe inicializar algunas propiedades con valores predeterminados', () => {
    const toast = new Toast();

    toast.title = '';
    toast.description = '';

    expect(toast.title).toBe('');
    expect(toast.description).toBe('');
    expect(toast.iconName).toBe(undefined);
    expect(toast.severity).toBe(undefined);
    expect(toast.autoClosing).toBeFalsy();
  });

  test('debería inicializar algunas propiedades con los valores proporcionados en el constructor', () => {
    const toast = new Toast({
      title: 'Test',
      description: 'This is a test',
      iconName: 'test',
      severity: 'info',
      autoClosing: true,
    });
    expect(toast.title).toBe('Test');
    expect(toast.description).toBe('This is a test');
    expect(toast.iconName).toBe('test');
    expect(toast.severity).toBe('info');
    expect(toast.autoClosing).toBeTruthy();
  });

  test('debería actualizar las propiedades cuando se establezcan valores', () => {
    const toast = new Toast({
      title: 'Test',
      description: 'This is a test',
      iconName: 'test',
      severity: 'info',
      autoClosing: true,
    });

    toast.title = 'Test 2';
    toast.description = 'This is a test 2';

    expect(toast.title).toBe('Test 2');
    expect(toast.description).toBe('This is a test 2');
  });
});
