import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const translateService = inject(TranslateService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorKey = 'ERRORS.UNKNOWN';

      if (err.status === 401) {
        errorKey = 'ERRORS.UNAUTHORIZED';
      } else if (err.status === 403) {
        errorKey = 'ERRORS.FORBIDDEN';
      } else if (err.status === 404) {
        errorKey = 'ERRORS.NOT_FOUND';
      } else if (err.status === 500) {
        errorKey = 'ERRORS.INTERNAL_SERVER_ERROR';
      }

      translateService.get(errorKey).subscribe(errorMessage => {
        toastService.showError(errorMessage, err.message);
        console.error(errorMessage);
      });

      return throwError(() => err);
    })
  );
};
