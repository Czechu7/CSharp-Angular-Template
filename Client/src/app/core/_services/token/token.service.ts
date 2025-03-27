import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { map, Observable } from 'rxjs';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
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

  refreshToken(tokens: ITokens): Observable<IAuthTokensResponseDto> {
    const body: IAuthRefreshTokensRequestDto = {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken.refreshToken,
    };
    return this.requestFactory
      .post<IAuthTokensResponseDto, IAuthRefreshTokensRequestDto>(ApiEndpoints.REFRESH_TOKEN, body)
      .pipe(map((response: IBaseResponse<IAuthTokensResponseDto>) => response.data));
  }

  decodeToken(token: IAccessToken): IDecodedToken | null {
    if (token !== null) {
      return jwtDecode<IDecodedToken>(token);
    } else {
      return null;
    }
  }

  getAccessToken(): IAccessToken | null {
    const accessToken = localStorage.getItem('accessToken');
    return accessToken;
  }

  getRefreshToken(): IRefreshToken | null {
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

  setTokens(accessToken: IAccessToken, refreshToken: IRefreshToken): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken.refreshToken);
    localStorage.setItem('refreshTokenExpiresAt', refreshToken.expiresAt);
  }

  removeTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('refreshTokenExpiresAt');
  }

  validateToken(token: IAccessToken | null): boolean {
    if (token === null) {
      return false;
    }

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

  validateRefreshToken(refreshToken: IRefreshToken | null): boolean {
    if (refreshToken === null) {
      return false;
    }

    const expiresAt = new Date(refreshToken.expiresAt);
    const currentDate = new Date();

    if (refreshToken !== null) {
      return expiresAt > currentDate;
    } else {
      return false;
    }
  }
}
