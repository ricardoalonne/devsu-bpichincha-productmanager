import { Injectable, OnInit } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { authorId } from '../constants/identifier.constant';

@Injectable()
export class AuthorInterceptor implements HttpInterceptor {
  authorId?: string;

  constructor() {
    this.authorId = authorId;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.authorId) return next.handle(request);

    const modifiedRequest = request.clone({
      setHeaders: {
        authorId,
      },
    });

    return next.handle(modifiedRequest);
  }
}
