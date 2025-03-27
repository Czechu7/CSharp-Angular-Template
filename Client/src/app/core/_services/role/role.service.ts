import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  role = signal<string | null>(null);

  setRole(role: string | null): void {
    this.role.set(role);
  }

  isAuthorized(role: string): boolean {
    if (role === null) {
      return false;
    }

    const currentRole = this.role();
    return currentRole === role;
  }
}
