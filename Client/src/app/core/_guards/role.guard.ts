import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { RoleService } from '../_services/role/role.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const roleService = inject(RoleService);
  const requiredRole = route.data['roles'] as Array<string>;
  return roleService.isAuthorized(requiredRole);
};
