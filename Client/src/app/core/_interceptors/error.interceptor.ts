import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';
import { TranslateService } from '@ngx-translate/core';
import { TokenService } from '../_services/token/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const translateService = inject(TranslateService);
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'ERRORS.UNKNOWN';

      if (err.status === 401) {
        errorMessage = 'ERRORS.UNAUTHORIZED';
        if (tokenService.validateRefreshToken(tokenService.getRefreshToken())) {
          return EMPTY;
        }
        errorMessage = 'ERRORS.UNAUTHORIZED';
      } else if (err.status === 403) {
        errorMessage = 'ERRORS.FORBIDDEN';
      } else if (err.status === 404) {
        errorMessage = 'ERRORS.NOT_FOUND';
      } else if (err.status === 500) {
        errorMessage = 'ERRORS.INTERNAL_SERVER_ERROR';
      }

      translateService.get(errorMessage).subscribe(errorMessage => {
        toastService.showError(errorMessage, err.message);
        console.error(errorMessage);
      });

      return throwError(() => err);
    })
  );
};
