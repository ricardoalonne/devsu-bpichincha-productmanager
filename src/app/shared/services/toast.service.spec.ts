import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { Toast } from '../models/toast';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('debería agregar el elemento ingresado al observable', () => {
    const toast: Toast = {
      title: 'Test',
      description: 'This is a test',
      severity: 'info',
      autoClosing: false,
    };

    service.showToast(toast);

    service.toasts$.subscribe({
      next: (response) => {
        expect(response.length).toBe(1);
        expect(response).toEqual(toast);
      },
    });
  });

  test('debería agregar los elementos ingresados al observable', () => {
    const toasts: Toast[] = [
      {
        title: 'Test',
        description: 'This is a test',
        severity: 'info',
        autoClosing: false,
      },
      {
        title: 'Test 2',
        description: 'This is a test 2',
        severity: 'error',
        autoClosing: false,
      },
    ];

    service.showToast(toasts);

    service.toasts$.subscribe({
      next: (response) => {
        expect(response.length).toBe(2);
        expect(response).toEqual(toasts);
      },
    });
  });
});
