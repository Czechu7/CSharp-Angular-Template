import { inject, Injectable, OnInit, signal } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { Observable, tap } from 'rxjs';
import { IBaseResponse, IBaseResponseWithoutData } from '../../_models/base-response.model';
import {
  IAuthTokensResponseDto,
  ILoginDto,
  IRegisterDto,
  IRevokeTokenRequestDto,
} from '../../_models/DTOs/authDto.model';
import { TokenService } from '../token/token.service';
import { IAccessToken } from '../../_models/tokens.model';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private requestFactory = inject(RequestFactoryService);
  private tokenService = inject(TokenService);
  private route = inject(Router);
  private toastService = inject(ToastService);

  public isLogged = signal<boolean>(this.isAuth());

  public signIn(loginData: ILoginDto): Observable<IBaseResponse<IAuthTokensResponseDto>> {
    return this.requestFactory
      .post<IAuthTokensResponseDto, ILoginDto>(ApiEndpoints.SIGN_IN, loginData)
      .pipe(
        tap((res: IBaseResponse<IAuthTokensResponseDto>) => {
          if (res.success && res.data) {
            this.tokenService.setTokens(res.data.accessToken, {
              refreshToken: res.data.refreshToken,
              expiresAt: res.data.expiresAt,
            });
            this.isLogged.set(true);
            this.route.navigate(['/']);
          }
        })
      );
  }

  public signUp(registerData: IRegisterDto): Observable<IBaseResponse<IAuthTokensResponseDto>> {
    return this.requestFactory
      .post<IAuthTokensResponseDto, IRegisterDto>(ApiEndpoints.SIGN_UP, registerData)
      .pipe(
        tap((res: IBaseResponse<IAuthTokensResponseDto>) => {
          if (res.success && res.data) {
            this.tokenService.setTokens(res.data.accessToken, {
              refreshToken: res.data.refreshToken,
              expiresAt: res.data.expiresAt,
            });
            this.isLogged.set(true);
            this.route.navigate(['/']);
          }
        })
      );
  }

  public signOut(): void {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return;
    }

    this.requestFactory
      .post<
        IBaseResponseWithoutData,
        IRevokeTokenRequestDto
      >(ApiEndpoints.REVOKE_TOKEN, { refreshToken: refreshToken.refreshToken })
      .subscribe({
        next: res => {
          if (res.success) {
            this.tokenService.removeTokens();
            this.isLogged.set(false);
            this.toastService.showSuccess('Account', 'You have been logged out!');
          }
        },
        error: error => {
          console.log(error);
        },
      });
  }

  public resetPassword() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public changePassword() {}

  public isAuth(): boolean {
    const accessToken = this.tokenService.getAccessToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return false;
    }

    const isRefreshTokenValid = this.tokenService.validateRefreshToken(refreshToken);

    if (isRefreshTokenValid) {
      return true;
    }

    this.tokenService.removeTokens();
    return false;
  }

  public getUserId() {
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken !== null) {
      const decodedToken = this.tokenService.decodeToken(accessToken);
      return decodedToken ? decodedToken.sub : null;
    } else {
      return null;
    }
  }

  public getUserName() {
    const accessToken = this.tokenService.getAccessToken();
    if (accessToken !== null) {
      const decodedToken = this.tokenService.decodeToken(accessToken);
      return decodedToken ? decodedToken.unique_name : null;
    } else {
      return null;
    }
  }
  public getUserEmail() {
    const accessToken: IAccessToken | null = this.tokenService.getAccessToken();
    if (accessToken !== null) {
      const decodedToken = this.tokenService.decodeToken(accessToken);
      return decodedToken ? decodedToken.email : null;
    } else {
      return null;
    }
  }
}
