import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../_services/token/token.service';
import { catchError, switchMap, throwError } from 'rxjs';
import { ITokens } from '../_models/tokens.model';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const accessToken = tokenService.getAccessToken();
        const refreshToken = tokenService.getRefreshToken();

        if (accessToken && refreshToken) {
          return tokenService.refreshToken({ accessToken, refreshToken }).pipe(
            switchMap((newTokens: ITokens) => {
              tokenService.setAccessToken(newTokens.accessToken);
              tokenService.setRefreshToken(newTokens.refreshToken);

              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.accessToken}`,
                },
              });
              return next(clonedReq);
            }),
            catchError(refreshError => {
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
