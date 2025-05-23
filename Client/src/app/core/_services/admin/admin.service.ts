import { inject, Injectable } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { IUserAdmin, IUserAdminResponse } from '../../_models/user-admin.model';
import { delay, Observable, of } from 'rxjs';
import { IBaseResponse, IBaseResponseWithoutData } from '../../_models/base-response.model';
import { IPagedQueryParams } from '../../_models/paged-query-params.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private requestFactory = inject(RequestFactoryService);

  getUserDetails(id: string): Observable<IBaseResponse<IUserAdmin>> {
    return this.requestFactory.getById<IUserAdmin>(ApiEndpoints.GET_ADMIN_USERS, id);
  }

  getPagedUsers(queryParams: IPagedQueryParams): Observable<IBaseResponse<IUserAdminResponse>> {
    return this.requestFactory.getPaged<IUserAdminResponse>(
      ApiEndpoints.GET_ADMIN_USERS,
      queryParams,
    );
  }

  deleteUser(id: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  sendPasswordResetEmail() {
    return of(true).pipe(delay(500));
  }

  updateUserProfile(user: any, id: string): Observable<IBaseResponseWithoutData> {
    return this.requestFactory.update<IBaseResponseWithoutData, IUserAdmin>(
      ApiEndpoints.PUT_ADMIN_USER,
      id,
      user,
    );
  }

  constructor() {}
}
