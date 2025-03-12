import { Injectable } from '@angular/core';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { LoginModel, RegisterModel } from '../../_models/auth.model';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private requestFactory: RequestFactoryService) {
    this.autoLogin();
  }

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

  autoLogin() {
    return this.requestFactory.getAll(ApiEndpoints.AUTO_LOGIN).pipe(
      tap(() => {
        this.loggedUser$.next(true);
      }),
      catchError(error => {
        this.loggedUser$.next(false);
        return throwError(() => error);
      })
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  resetPassword() {}
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changePassword() {}
}
