import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiEndpoints } from '../../enums/api-endpoints.enum';
import { IBaseResponse } from '../_models/base-response.model';
import { IKarmelki, IKarmelkiResponse } from '../_models/karmelki.model';
import { IPagedQueryParams } from '../_models/paged-query-params.model';
import { RequestFactoryService } from './httpRequestFactory/request-factory.service';

@Injectable({
  providedIn: 'root',
})
export class ExampleCrudService {
  constructor(private requestFactory: RequestFactoryService) {}

  getAllKarmelki(): Observable<IBaseResponse<IKarmelki[]>> {
    return this.requestFactory.getAll<IKarmelki[]>(ApiEndpoints.KARMELKI);
  }

  getPagedKarmelki(queryParams: IPagedQueryParams): Observable<IBaseResponse<IKarmelkiResponse>> {
    return this.requestFactory.getPaged<IKarmelkiResponse>(ApiEndpoints.KARMELKI, queryParams);
  }

  getKarmelekById(id: string): Observable<IBaseResponse<IKarmelki>> {
    return this.requestFactory.getById<IKarmelki>(ApiEndpoints.KARMELKI, id);
  }

  createKarmelek(karmelek: IKarmelki): Observable<IBaseResponse<IKarmelki>> {
    return this.requestFactory.create<IKarmelki, IKarmelki>(ApiEndpoints.KARMELKI, karmelek);
  }

  updateKarmelek(id: string, karmelek: IKarmelki): Observable<IBaseResponse<IKarmelki>> {
    return this.requestFactory.update<IKarmelki, IKarmelki>(ApiEndpoints.KARMELKI, id, karmelek);
  }

  deleteKarmelek(id: string): Observable<IBaseResponse<IKarmelki>> {
    return this.requestFactory.delete<IKarmelki>(ApiEndpoints.KARMELKI, id);
  }
}
