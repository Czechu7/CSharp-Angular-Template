import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../_services/token/token.service';
import { catchError, switchMap, throwError } from 'rxjs';

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = tokenService.getRefreshToken();

        if (refreshToken) {
          return tokenService.refreshToken(refreshToken).pipe(
            switchMap((newTokens: Tokens) => {
              tokenService.setAccessToken(newTokens.accessToken);
              tokenService.setRefreshToken(newTokens.refreshToken);

              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.accessToken}`,
                },
              });
              return next(clonedReq);
            }),
            catchError((refreshError) => {
              tokenService.removeTokens();
              return throwError(refreshError);
            })
          );
        } else {
          tokenService.removeTokens();
          return throwError(error);
        }
      } else {
        return throwError(error);
      }
    })
  );
};