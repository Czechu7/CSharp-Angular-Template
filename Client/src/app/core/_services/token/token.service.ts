import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, Observable } from 'rxjs';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { IBaseResponse } from '../../_models/base-response.model';
import { IDecodedToken } from '../../_models/decoded-token.model';
import { ITokens } from '../../_models/tokens.model';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private requestFactory = inject(RequestFactoryService);

  constructor() {}

  refreshToken(tokens: ITokens): Observable<ITokens> {
    return this.requestFactory
      .post<ITokens, { refreshToken: string }>(ApiEndpoints.REFRESH_TOKEN, tokens)
      .pipe(map((response: IBaseResponse<ITokens>) => response.data));
  }

  isAuth(): boolean {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return false;
    }

    if (this.validateToken(accessToken) && this.validateToken(refreshToken)) {
      return true;
    }

    if (!this.validateToken(accessToken) && this.validateToken(refreshToken)) {
      return true;
    }

    this.removeTokens();
    return false;
  }

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

  decodeToken(token: string): IDecodedToken | null {
    if (token !== null) {
      return jwtDecode<IDecodedToken>(token);
    } else {
      return null;
    }
  }

  validateToken(token: string): boolean {
    const decodedToken = this.decodeToken(token);
    try {
      if (decodedToken !== null) {
        return decodedToken.exp * 1000 > Date.now();
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
