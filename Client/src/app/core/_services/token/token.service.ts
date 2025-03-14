import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, Observable } from 'rxjs';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { IBaseResponse } from '../../_models/base-response.model';
import { IDecodedToken } from '../../_models/decoded-token.model';
import { IAccessToken, IRefreshToken, ITokens } from '../../_models/tokens.model';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import {
  IAuthRefreshTokensRequestDto,
  IAuthTokensResponseDto,
} from '../../_models/DTOs/authDto.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private requestFactory = inject(RequestFactoryService);

  public refreshToken(tokens: ITokens): Observable<IAuthTokensResponseDto> {
    const body: IAuthRefreshTokensRequestDto = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken.refreshToken,
    };
    return this.requestFactory
      .post<IAuthTokensResponseDto, IAuthRefreshTokensRequestDto>(ApiEndpoints.REFRESH_TOKEN, body)
      .pipe(map((response: IBaseResponse<IAuthTokensResponseDto>) => response.data));
  }

  public decodeToken(token: IAccessToken): IDecodedToken | null {
    if (token !== null) {
      return jwtDecode<IDecodedToken>(token);
    } else {
      return null;
    }
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

  public saveTokens(accessToken: IAccessToken, refreshToken: IRefreshToken): void {
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
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }

  public validateRefreshToken(refreshToken: IRefreshToken): boolean {
    const expiresAt = new Date(refreshToken.expiresAt);
    const currentDate = new Date();

    if (refreshToken !== null) {
      return expiresAt > currentDate;
    } else {
      return false;
    }
  }
}
