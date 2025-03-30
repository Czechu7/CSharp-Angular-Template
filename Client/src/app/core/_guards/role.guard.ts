import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RoleService } from '../_services/role/role.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const roleGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService);
  const requiredRole = route.data['roles'];

  return roleService.isAuthorized(requiredRole);
};
