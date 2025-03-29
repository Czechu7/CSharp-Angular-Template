import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouterEnum } from '../../enums/router.enum';
import { AuthService } from '../_services/auth/auth.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const unAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuth()) {
    return true;
  }

  router.navigate([RouterEnum.home]);
  return false;
};
