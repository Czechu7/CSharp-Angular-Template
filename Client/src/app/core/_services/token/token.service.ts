import { Injectable, Signal, signal } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { DecodedToken } from '../../_models/decoded-token.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  setAccessToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  setRefreshToken(token: string): void {
    localStorage.setItem('refreshToken', token);
  }

  getAccessToken(): string | null {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }

  getRefreshToken(): string | null {
    const refreshToken = localStorage.getItem('refreshToken');
    return refreshToken;
  }

  removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  tokensIsValid(): boolean {
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
