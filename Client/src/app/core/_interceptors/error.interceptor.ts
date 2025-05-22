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
      let errorMessage = '';

      switch (err.status) {
        case 400:
          if (err.error.message.includes('User is already registered')) {
            errorMessage = 'ERRORS.EMAIL_OR_USER_ALREADY_EXISTS';
          } else {
            errorMessage = 'ERRORS.BAD_REQUEST';
          }
          break;
        case 401:
          if (err.error.message.includes('Invalid credentials')) {
            errorMessage = 'ERRORS.INVALID_CREDENTIALS';
          } else {
            errorMessage = 'ERRORS.UNAUTHORIZED';
          }
          break;
        case 403:
          errorMessage = 'ERRORS.FORBIDDEN';
          break;
        case 404:
          errorMessage = 'ERRORS.NOT_FOUND';
          break;
        case 500:
          errorMessage = 'ERRORS.INTERNAL_SERVER_ERROR';
          break;
        default:
          errorMessage = 'ERRORS.UNKNOWN';
          break;
      }

      if (err.status === 401 && tokenService.validateRefreshToken(tokenService.getRefreshToken())) {
        return EMPTY;
      }

      translateService.get(['ERRORS.TITLE', errorMessage]).subscribe(translations => {
        const translatedTitle = translations['ERRORS.TITLE'];
        const translatedMessage = translations[errorMessage];
        toastService.showError(translatedTitle, translatedMessage);
        console.error(err.message);
      });

      return throwError(() => err);
    }),
  );
};
