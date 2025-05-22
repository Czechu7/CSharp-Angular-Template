import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { IBaseResponse, IBaseResponseWithoutData } from '../../_models/base-response.model';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { ToastService } from '../../../shared/services/toast.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private requestFactory = inject(RequestFactoryService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  updateUserData(userData: any): Observable<IBaseResponseWithoutData> {
    return this.requestFactory
      .post<IBaseResponseWithoutData, any>(ApiEndpoints.UPDATE_USER, userData)
      .pipe(
        tap((res: IBaseResponseWithoutData) => {
          if (res.success) {
            this.toastService.showSuccess('Success', 'Profile updated successfully');
          }
        })
      );
  }

  getCurrentUserData(): Observable<IBaseResponse<any>> {
    return this.requestFactory
      .post<IBaseResponse<any>, void>(ApiEndpoints.GET_CURRENT_USER, undefined)
      .pipe(
        tap((res: IBaseResponse<any>) => {
          if (!res.success) {
            this.toastService.showError('Error', 'Failed to fetch user data');
          }
        })
      );
  }
}