import { inject, Injectable } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { IUserAdmin } from '../../_models/user-admin.model';
import { delay, Observable, of } from 'rxjs';
import { IBaseResponse } from '../../_models/base-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private requestFactory = inject(RequestFactoryService);

  getPageableUsers(pageNumber: number, pageSize: number): Observable<IBaseResponse<IUserAdmin[]>> {
    return this.requestFactory.getPaged<IUserAdmin[]>(ApiEndpoints.GET_ADMIN_USERS, {
      pageNumber,
      pageSize,
    });
  }

  setUserRole() {}
  setUserStatus() {}

  getUsers(page: number, pageSize: number): Observable<IBaseResponse<IUserAdmin[]>> {
    const mockUsers: IUserAdmin[] = [
      {
        id: '1',
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan.kowalski@mail.com',
        role: 'Admin',
        createdAt: new Date(2022, 5, 15),
        isActive: true,
      },
      {
        id: '2',
        firstName: 'Anna',
        lastName: 'Nowak',
        email: 'anna.nowak@mail.com',
        role: 'User',
        createdAt: new Date(2023, 1, 20),
        isActive: true,
      },
    ];

    const response: IBaseResponse<IUserAdmin[]> = {
      data: mockUsers,
      pagination: {
        pageSize: pageSize,
        pageNumber: page,
        totalCount: mockUsers.length,
      },
      success: true,
      statusCode: 200,
      message: 'Mock users fetched successfully',
    };

    return of(response).pipe(delay(500));
  }

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
      role: 'Admin',
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
