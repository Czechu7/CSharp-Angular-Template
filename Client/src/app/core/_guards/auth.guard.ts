import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { switchMap, map, catchError, of } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';
import { RouterEnum } from '../../config/router.enum';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.autoLogin().pipe(
    switchMap(() => authService.loggedUser$),
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
