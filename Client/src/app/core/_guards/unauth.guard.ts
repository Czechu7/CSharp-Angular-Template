import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RouterEnum } from '../../enums/router.enum';
import { AuthService } from '../_services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuth()) {
    return true;
  }

  const url = state.url;
  if (url && url !== '/' && url !== `/${RouterEnum.login}`) {
    router.navigate([RouterEnum.login], {
      queryParams: { returnUrl: url },
    });
  } else {
    router.navigate([RouterEnum.login]);
  }

  return false;
};
