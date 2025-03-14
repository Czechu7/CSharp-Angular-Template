import { inject, Injectable, OnInit, signal } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { tap } from 'rxjs';
import { IBaseResponse } from '../../_models/base-response.model';
import { IAuthTokensResponseDto, ILoginDto, IRegisterDto } from '../../_models/DTOs/authDto.model';
import { TokenService } from '../token/token.service';
import { IAccessToken } from '../../_models/tokens.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private requestFactory = inject(RequestFactoryService);
  private tokenService = inject(TokenService);
  private route = inject(Router);

  isLogged = signal<boolean>(this.isAuth());

  signIn(loginData: ILoginDto) {
    return this.requestFactory
      .post<IAuthTokensResponseDto, ILoginDto>(ApiEndpoints.SIGN_IN, loginData)
      .pipe(
        tap((res: IBaseResponse<IAuthTokensResponseDto>) => {
          if (res.success && res.data) {
            this.tokenService.saveTokens(res.data.accessToken, {
              refreshToken: res.data.refreshToken,
              expiresAt: res.data.expiresAt,
            });
            this.isLogged.set(true);
            this.route.navigate(['/']);
          }
        })
      );
  }

  signUp(registerData: IRegisterDto) {
    return this.requestFactory
      .post<IAuthTokensResponseDto, IRegisterDto>(ApiEndpoints.SIGN_UP, registerData)
      .pipe(
        tap((res: IBaseResponse<IAuthTokensResponseDto>) => {
          if (res.success && res.data) {
            this.tokenService.saveTokens(res.data.accessToken, {
              refreshToken: res.data.refreshToken,
              expiresAt: res.data.expiresAt,
            });
            this.isLogged.set(true);
            this.route.navigate(['/']);
          }
        })
      );
  }

  signOut(): void {
    const refreshToken = this.tokenService.getRefreshToken();
    if (!refreshToken) {
      return;
    }

    this.requestFactory
      .post<
        null,
        { refreshToken: string }
      >(ApiEndpoints.SIGN_OUT, { refreshToken: refreshToken?.refreshToken })
      .subscribe({
        next: res => {
          console.log(res);
        },
        error: error => {
          console.log(error);
        },
      });
    this.tokenService.removeTokens();
    this.isLogged.set(false);
  }

  resetPassword() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changePassword() {}

  public isAuth(): boolean {
    const accessToken = this.tokenService.getAccessToken();
    const refreshToken = this.tokenService.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return false;
    }

    if (
      this.tokenService.validateToken(accessToken) &&
      this.tokenService.validateRefreshToken(refreshToken)
    ) {
      return true;
    }

    if (
      !this.tokenService.validateToken(accessToken) &&
      this.tokenService.validateRefreshToken(refreshToken)
    ) {
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
