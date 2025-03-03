import { Injectable, Signal, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../_models/decoded-token.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  accessToken$ = signal<string | null>(null);
  refreshToken$ = signal<string | null>(null);

  constructor() {}

  setAccessToken(token: string): void {
    this.accessToken$.set(token);
  }

  setRefreshToken(token: string): void {
    this.refreshToken$.set(token);
  }

  getAccessToken(): string | null {
    return this.accessToken$();
  }

  getRefreshToken(): string | null {
    return this.refreshToken$();
  }

  removeTokens(): void {
    this.accessToken$.set(null);
    this.refreshToken$.set(null);
  }

  isValid(): boolean {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (accessToken === null || refreshToken === null) {
      return false;
    }

    if (this.validateToken(accessToken) && this.validateToken(refreshToken)) {
      return true;
    } else {
      return false;
    }
  }

  getUserId(): string | null {
    const accessToken = this.getAccessToken();
    if (accessToken !== null) {
      const decodedToken = this.decodeToken(accessToken);
      return decodedToken ? decodedToken.sub : null;
    } else {
      return null;
    }
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  loadTokens(): void {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken === null || refreshToken === null) {
      return;
    }

    if (this.validateToken(accessToken) && this.validateToken(refreshToken)) {
      this.setAccessToken(accessToken);
      this.setRefreshToken(refreshToken);
    }
  }

  decodeToken(token: string): DecodedToken | null {
    if (token !== null) {
      return jwtDecode<DecodedToken>(token);
    } else {
      return null;
    }
  }

  validateToken(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    if (decodedToken !== null) {
      return decodedToken.exp * 1000 > Date.now();
    } else {
      return false;
    }
  }
}
