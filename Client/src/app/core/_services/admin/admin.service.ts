import { inject, Injectable } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { IUserAdmin, IUserAdminResponse } from '../../_models/user-admin.model';
import { delay, Observable, of } from 'rxjs';
import { IBaseResponse } from '../../_models/base-response.model';
import { IPagedQueryParams } from '../../_models/paged-query-params.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private requestFactory = inject(RequestFactoryService);

  getPagedUsers(queryParams: IPagedQueryParams): Observable<IBaseResponse<IUserAdminResponse>> {
    return this.requestFactory.getPaged<IUserAdminResponse>(
      ApiEndpoints.GET_ADMIN_USERS,
      queryParams,
    );
  }

  setUserRole() {}
  setUserStatus() {}

  deleteUser(id: string): Observable<boolean> {
    return of(true).pipe(delay(500));
  }

  sendPasswordResetEmail() {
    return of(true).pipe(delay(500));
  }

  getUserDetails(id: string): Observable<IBaseResponse<IUserAdmin>> {
    const mockUser: IUserAdmin = {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'mail@mail.com',
      roles: 'Admin',
      createdAt: new Date(2022, 5, 15),
      isActive: true,
    };

    const response: IBaseResponse<IUserAdmin> = {
      data: mockUser,
      success: true,
      statusCode: 200,
      message: 'Mock users fetched successfully',
    };

    return of(response).pipe(delay(500));
  }

  constructor() {}
}
