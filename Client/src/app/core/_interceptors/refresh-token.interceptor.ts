import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { IAuthTokensResponseDto } from '../_models/DTOs/authDto.model';
import { IAccessToken, IRefreshToken } from '../_models/tokens.model';
import { TokenService } from '../_services/token/token.service';
import { ApiEndpoints } from '../../enums/api-endpoints.enum';

let isRefreshing = false;

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  if (req.url.includes(ApiEndpoints.REFRESH_TOKEN)) {
    return next(req);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;

        const accessToken = tokenService.getAccessToken();
        const refreshToken = tokenService.getRefreshToken();

        if (accessToken && refreshToken) {
          return tokenService.refreshToken({ accessToken, refreshToken }).pipe(
            switchMap((newTokens: IAuthTokensResponseDto) => {
              const newAccessToken: IAccessToken = newTokens.accessToken;
              const newRefreshToken: IRefreshToken = {
                refreshToken: newTokens.refreshToken,
                expiresAt: newTokens.expiresAt,
              };
              tokenService.setTokens(newAccessToken, newRefreshToken);

              const clonedReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.accessToken}`,
                },
              });
              isRefreshing = false;
              return next(clonedReq);
            }),
            catchError(refreshError => {
              isRefreshing = false;
              tokenService.removeTokens();
              return throwError(() => refreshError);
            }),
          );
        } else {
          isRefreshing = false;
          tokenService.removeTokens();
          return throwError(() => error);
        }
      } else {
        return throwError(() => error);
      }
    }),
  );
};
