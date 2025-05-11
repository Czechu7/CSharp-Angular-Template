import { inject, Injectable } from '@angular/core';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { IUserAdmin } from '../../_models/user-admin.model';
import { Observable } from 'rxjs';
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

  constructor() {}
}
