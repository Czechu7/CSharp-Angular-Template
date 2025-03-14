import { HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ToastService } from '../../shared/services/toast.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../_services/token/token.service';
import { IAccessToken } from '../_models/tokens.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  const tokenService = inject(TokenService);
  const routerService = inject(Router);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      let errorMessage = 'Error occurred';

      if (err.status === 401) {
        const token: IAccessToken | null = tokenService.getAccessToken();

        if (token === null) {
          errorMessage = 'Unauthorized';
          routerService.navigate(['/login']);
        }

        if (tokenService.validateToken(token)) {
          errorMessage = 'Unauthorized';
        } else {
          return next(req);
        }
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
