import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../_services/token/token.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'Error occurred';

      if (err.status === 401) {
        if (tokenService.validateRefreshToken(tokenService.getRefreshToken())) {
          return EMPTY;
        }
        errorMessage = 'Unauthorized';
      } else if (err.status === 403) {
        errorMessage = 'Forbidden';
      } else if (err.status === 404) {
        errorMessage = 'Not found';
      } else if (err.status === 500) {
        errorMessage = 'Internal server error';
      }

      toastService.showError(errorMessage, err.message);
      console.error(errorMessage);

      return throwError(() => err);
    })
  );
};
