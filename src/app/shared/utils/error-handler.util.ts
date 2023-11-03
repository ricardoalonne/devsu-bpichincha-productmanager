import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

export const errorHandler = (
  httpErrorResponse: HttpErrorResponse
): Observable<never> => {
  if (httpErrorResponse.status) {
    if (httpErrorResponse.status.toString().startsWith('20'))
      return of(httpErrorResponse.error.text) as Observable<never>;

    console.error(
      `Error [SC-${httpErrorResponse.status}]`,
      httpErrorResponse.error
    );
  } else console.error(`Error [SC-UNK]`, httpErrorResponse.error);

  return throwError(() => new Error('Ocurrió un error, vuelva a intentar.'));
};
