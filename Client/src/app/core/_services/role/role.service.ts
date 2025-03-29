import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  role = signal<string | null>(null);

  setRole(roles: string | null): void {
    this.role.set(roles);
  }

  isAuthorized(roles: string[]): boolean {
    if (roles === null) {
      return false;
    }

    const currentRole = this.role();
    return currentRole !== null && roles.includes(currentRole);
  }
}
