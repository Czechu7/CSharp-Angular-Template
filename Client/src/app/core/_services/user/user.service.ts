import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { IBaseResponse, IBaseResponseWithoutData } from '../../_models/base-response.model';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { IUser, IUSerUpdate } from '../../_models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private requestFactory = inject(RequestFactoryService);



  updateUserData( id: string, userData: IUSerUpdate): Observable<IBaseResponseWithoutData> {
    return this.requestFactory
      .update<IBaseResponseWithoutData, IUSerUpdate>(ApiEndpoints.UPDATE_USER, id, userData)
  }

  getCurrentUserData(): Observable<IBaseResponse<IUser>> {
    return this.requestFactory
       .get<IUser>(ApiEndpoints.GET_CURRENT_USER)
  }
}