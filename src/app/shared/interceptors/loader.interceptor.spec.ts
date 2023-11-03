import { TestBed } from '@angular/core/testing';

import { LoaderInterceptor } from './loader.interceptor';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoaderService } from '../services/loader.service';
import { HttpClient, HttpRequest, HttpResponse } from '@angular/common/http';
import { finalize, of } from 'rxjs';

describe('LoaderInterceptor', () => {
  let interceptor: LoaderInterceptor;
  let loaderService: LoaderService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoaderInterceptor],
    });
    interceptor = TestBed.inject(LoaderInterceptor);
    loaderService = TestBed.inject(LoaderService);
    httpClient = TestBed.inject(HttpClient);
  });

  test('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  test('debería llamar a show() de loadingService antes de realizar la solicitud y a hide() al terminarla.', () => {
    const showSpy = jest.spyOn(loaderService, 'show');
    const hideSpy = jest.spyOn(loaderService, 'hide');

    const request = new HttpRequest(
      'GET',
      'https://www.thunderclient.com/welcome'
    );

    interceptor
      .intercept(request, {
        handle: (req: HttpRequest<any>) => {
          expect(hideSpy).not.toHaveBeenCalled();
          expect(showSpy).toHaveBeenCalled();
          return of(new HttpResponse({ status: 200 }));
        },
      })
      .subscribe({
        complete: () => {
          expect(showSpy).not.toHaveBeenCalled();
          expect(hideSpy).toHaveBeenCalled();
        },
      });
  });
});
