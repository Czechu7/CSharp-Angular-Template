import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { switchMap, map, catchError, of } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';
import { RouterEnum } from '../../config/router.enum';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const unAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.autoLogin().pipe(
    switchMap(() => authService.loggedUser$),
    map(isLoggedIn => {
      if (isLoggedIn) {
        router.navigate([RouterEnum.home]);
        return false;
      } else {
        return true;
      }
    }),
    catchError(() => {
      return of(true);
    })
  );
};
