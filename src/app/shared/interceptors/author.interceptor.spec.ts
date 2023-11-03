import { TestBed } from '@angular/core/testing';
import { AuthorInterceptor } from './author.interceptor';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { of } from 'rxjs';
import { authorId } from '../constants/identifier.constant';

describe('AuthorInterceptor', () => {
  let interceptor: AuthorInterceptor;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthorInterceptor],
    });

    interceptor = TestBed.inject(AuthorInterceptor);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  test('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  test('debería agregar el encabezado authorId cuando authorId está definido', () => {
    const request = new HttpRequest(
      'GET',
      'https://www.thunderclient.com/welcome'
    );

    interceptor.intercept(request, {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.get('authorId')).toEqual(authorId);
        expect(req.headers.has('authorId')).toBeTruthy();
        return of(new HttpResponse({ status: 200 }));
      },
    });
  });

  test('no debería agregar el encabezado authorId cuando authorId no está definido', () => {
    const request = new HttpRequest(
      'GET',
      'https://www.thunderclient.com/welcome'
    );

    interceptor.authorId = undefined;

    interceptor.intercept(request, {
      handle: (req: HttpRequest<any>) => {
        expect(req.headers.has('authorId')).toBeFalsy();
        return of(new HttpResponse({ status: 200 }));
      },
    });
  });
});
