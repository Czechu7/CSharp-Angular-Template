import { inject, Injectable } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { tap } from 'rxjs';
import { IBaseResponse } from '../../_models/base-response.model';
import { ITokens } from '../../_models/tokens.model';
import { ILoginDto, IRegisterDto } from '../../_models/DTOs/authDto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private requestFactory = inject(RequestFactoryService);

  signIn(loginData: ILoginDto) {
    return this.requestFactory.post<ITokens, ILoginDto>(ApiEndpoints.SIGN_IN, loginData).pipe(
      tap((res: IBaseResponse<ITokens>) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      })
    );
  }

  signUp(registerData: IRegisterDto) {
    return this.requestFactory.post<ITokens, IRegisterDto>(ApiEndpoints.SIGN_UP, registerData).pipe(
      tap((res: IBaseResponse<ITokens>) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
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
