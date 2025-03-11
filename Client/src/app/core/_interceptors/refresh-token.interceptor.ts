import { HttpInterceptorFn } from '@angular/common/http';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
