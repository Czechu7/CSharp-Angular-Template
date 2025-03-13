import { inject, Injectable } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { tap } from 'rxjs';
import { IBaseResponse } from '../../_models/base-response.model';
import { IAuthTokensResponseDto, ILoginDto, IRegisterDto } from '../../_models/DTOs/authDto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private requestFactory = inject(RequestFactoryService);

  signIn(loginData: ILoginDto) {
    return this.requestFactory
      .post<IAuthTokensResponseDto, ILoginDto>(ApiEndpoints.SIGN_IN, loginData)
      .pipe(
        tap((res: IBaseResponse<IAuthTokensResponseDto>) => {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          localStorage.setItem('refreshTokenExpiresAt', res.data.expiresAt);
        })
      );
  }

  signUp(registerData: IRegisterDto) {
    return this.requestFactory
      .post<IAuthTokensResponseDto, IRegisterDto>(ApiEndpoints.SIGN_UP, registerData)
      .pipe(
        tap((res: IBaseResponse<IAuthTokensResponseDto>) => {
          localStorage.setItem('accessToken', res.data.accessToken);
          localStorage.setItem('refreshToken', res.data.refreshToken);
          localStorage.setItem('refreshTokenExpiresAt', res.data.expiresAt);
        })
      );
  }

  signOut(): void {
    this.requestFactory.post(ApiEndpoints.SIGN_OUT, null);
  }

  resetPassword() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changePassword() {}
}
