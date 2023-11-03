import { HttpErrorResponse } from '@angular/common/http';
import { errorHandler } from './error-handler.util';

describe('errorHandler', () => {
  test('debe registrar el error con el estado y el mensaje de error cuando se define el estado', (done) => {
    const mockHttpErrorResponse = new HttpErrorResponse({
      status: 404,
      error: 'Not Found',
    });

    jest.spyOn(console, 'error');

    errorHandler(mockHttpErrorResponse).subscribe({
      complete: () => {},
      error: (err) => {
        expect(console.error).toHaveBeenCalledWith(
          'Error [SC-404]',
          'Not Found'
        );
        expect(err.message).toBe('Ocurrió un error, vuelva a intentar.');
        done();
      },
    });
  });

  test('debería retornar el valor del texto sólo si el status es de tipo 200.', (done) => {
    const mockHttpErrorResponse = new HttpErrorResponse({
      status: 204,
      error: {
        error: 'error JSON parser',
        text: 'Se eliminó correctamente.',
      },
    });

    errorHandler(mockHttpErrorResponse).subscribe({
      complete: () => {},
      next: (response: any) => {
        expect(response).toBe('Se eliminó correctamente.');
        done();
      },
    });
  });

  test('debe registrar el error con solo un mensaje de error cuando el estado no está definido', (done) => {
    const mockHttpErrorResponse = new HttpErrorResponse({
      error: 'Internal Server Error',
    });

    jest.spyOn(console, 'error');

    errorHandler(mockHttpErrorResponse).subscribe({
      complete: () => {},
      error: (error) => {
        expect(console.error).toHaveBeenCalledWith(
          'Error [SC-UNK]',
          'Internal Server Error'
        );
        expect(error.message).toBe('Ocurrió un error, vuelva a intentar.');
        done();
      },
    });
  });
});
