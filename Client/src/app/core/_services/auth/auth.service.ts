import { Injectable } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private requestFactory: RequestFactoryService) {}

  singIn(username: string, password: string) {
    return this.requestFactory.post(ApiEndpoints.LOGIN, {
      username,
      password,
    });
  }

  signOut(): void {}
  signUp(username: string, password: string) {
    return this.requestFactory.post(ApiEndpoints.REGISTER, {
      username,
      password,
    });
  }
  resetPassword() {}
  changePassword() {}
}
