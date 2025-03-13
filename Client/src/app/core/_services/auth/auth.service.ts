import { inject, Injectable } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { tap } from 'rxjs';
import { BaseResponse } from '../../_models/base-response.model';
import { Tokens } from '../../_models/tokens.model';
import { RegisterDto } from '../../_models/DTOs/registerDto.model';
import { LoginDto } from '../../_models/DTOs/loginDto.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private requestFactory = inject(RequestFactoryService);

  signIn(loginData: LoginDto) {
    return this.requestFactory.post<Tokens, LoginDto>(ApiEndpoints.SIGN_IN, loginData).pipe(
      tap((res: BaseResponse<Tokens>) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      })
    );
  }

  signUp(registerData: RegisterDto) {
    return this.requestFactory.post<Tokens, RegisterDto>(ApiEndpoints.SIGN_UP, registerData).pipe(
      tap((res: BaseResponse<Tokens>) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
      })
    );
  }

  signOut(): void {
    this.requestFactory.post(ApiEndpoints.SIGN_OUT, null);
  }

  resetPassword() {}
  changePassword() {}
}
