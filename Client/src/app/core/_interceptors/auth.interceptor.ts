import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenService } from '../_services/token/token.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);

  const accessToken = tokenService.getAccessToken();

  if (accessToken && tokenService.validateToken(accessToken)) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return next(clonedReq);
  } else {
    return next(req);
  }
};
