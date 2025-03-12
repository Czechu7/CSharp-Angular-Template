import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { LoginModel, RegisterModel } from '../../_models/auth.model';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private requestFactory: RequestFactoryService) {}

  loggedUser$ = new BehaviorSubject<boolean>(false);

  singIn(values: LoginModel) {
    return this.requestFactory.post(ApiEndpoints.SIGN_IN, {
      ...values,
    });
  }

  signOut(): void {
    this.requestFactory.post(ApiEndpoints.SIGN_OUT, null);
  }

  signUp(values: RegisterModel) {
    return this.requestFactory.post(ApiEndpoints.SIGN_UP, {
      ...values,
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetPassword() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changePassword() {}
}
