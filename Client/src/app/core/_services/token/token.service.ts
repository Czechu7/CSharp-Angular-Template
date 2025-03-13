import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, Observable } from 'rxjs';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { IBaseResponse } from '../../_models/base-response.model';
import { IDecodedToken } from '../../_models/decoded-token.model';
import { IAccessToken, IRefreshToken, ITokens } from '../../_models/tokens.model';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private requestFactory = inject(RequestFactoryService);

  constructor() {}

  public refreshToken(tokens: ITokens): Observable<ITokens> {
    return this.requestFactory
      .post<ITokens, { refreshToken: IRefreshToken }>(ApiEndpoints.REFRESH_TOKEN, tokens)
      .pipe(map((response: IBaseResponse<ITokens>) => response.data));
  }

  public getUserId() {
    const accessToken = this.getAccessToken();
    if (accessToken !== null) {
      const decodedToken = this.decodeToken(accessToken);
      return decodedToken ? decodedToken.sub : null;
    } else {
      return null;
    }
  }

  public getUserName() {
    const accessToken = this.getAccessToken();
    if (accessToken !== null) {
      const decodedToken = this.decodeToken(accessToken);
      return decodedToken ? decodedToken.unique_name : null;
    } else {
      return null;
    }
  }
  public getUserEmail() {
    const accessToken: IAccessToken | null = this.getAccessToken();
    if (accessToken !== null) {
      const decodedToken = this.decodeToken(accessToken);
      return decodedToken ? decodedToken.email : null;
    } else {
      return null;
    }
  }

  private decodeToken(token: IAccessToken): IDecodedToken | null {
    if (token !== null) {
      return jwtDecode<IDecodedToken>(token);
    } else {
      return null;
    }
  }

  public isAuth(): boolean {
    const accessToken = this.getAccessToken();
    const refreshToken = this.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return false;
    }

    if (this.validateToken(accessToken) && this.validateRefreshToken(refreshToken)) {
      return true;
    }

    if (!this.validateToken(accessToken) && this.validateRefreshToken(refreshToken)) {
      return true;
    }

    this.removeTokens();
    return false;
  }

  public setAccessToken(accessToken: IAccessToken): void {
    localStorage.setItem('accessToken', accessToken);
  }

  public setRefreshToken(refreshToken: IRefreshToken): void {
    localStorage.setItem('refreshToken', refreshToken.refreshToken);
    localStorage.setItem('refreshTokenExpiresAt', refreshToken.expiresAt);
  }

  public getAccessToken(): IAccessToken | null {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }

  public getRefreshToken(): IRefreshToken | null {
    const refreshToken = localStorage.getItem('refreshToken');
    const refreshTokenExpiresAt = localStorage.getItem('refreshTokenExpiresAt');

    if (refreshToken === null || refreshTokenExpiresAt === null) {
      return null;
    }

    const token: IRefreshToken = {
      refreshToken: refreshToken,
      expiresAt: refreshTokenExpiresAt,
    };

    return token;
  }

  private saveTokens(accessToken: IAccessToken, refreshToken: IRefreshToken): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken.refreshToken);
    localStorage.setItem('refreshTokenExpiresAt', refreshToken.expiresAt);
  }

  private loadTokens(): void {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken: IRefreshToken | null = this.getRefreshToken();

    if (accessToken === null || refreshToken === null) {
      return;
    }

    if (this.validateToken(accessToken) && this.validateRefreshToken(refreshToken)) {
      this.setAccessToken(accessToken);
      this.setRefreshToken(refreshToken);
    }
  }

  public removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpiresAt');
  }

  public validateToken(token: IAccessToken): boolean {
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

  private validateRefreshToken(refreshToken: IRefreshToken): boolean {
    const expiresAt = new Date(refreshToken.expiresAt);
    const currentDate = new Date();

    if (refreshToken !== null) {
      return expiresAt > currentDate;
    } else {
      return false;
    }
  }
}
