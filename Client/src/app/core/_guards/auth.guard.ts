import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { RouterEnum } from '../../config/router.enum';
import { AuthService } from '../_services/auth/auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuth().pipe(
    map(isLoggedIn => {
      if (isLoggedIn) {
        return true;
      } else {
        router.navigate([RouterEnum.home]);
        return false;
      }
    }),
    catchError(() => {
      router.navigate([RouterEnum.home]);
      return of(false);
    })
  );
};
