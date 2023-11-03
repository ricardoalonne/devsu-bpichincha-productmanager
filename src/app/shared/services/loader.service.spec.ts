import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('debería mostrar loading', () => {
    service.show();
    service.isLoading$.subscribe((value) => {
      expect(value).toBe(true);
    });
  });

  test('debería ocultar el loading', () => {
    service.hide();
    service.isLoading$.subscribe((value) => {
      expect(value).toBe(false);
    });
  });
});
