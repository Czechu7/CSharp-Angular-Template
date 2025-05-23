import { inject, Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { ILog, IErrorLog } from '../../_models/log.model';
import { IBaseResponse } from '../../_models/base-response.model';
import { ILogResponse, wrapArrayResponse } from '../../_models/log-response.model';

@Injectable({
  providedIn: 'root',
})
export class AdminLogsService {
  private requestFactory = inject(RequestFactoryService);

  getLogs(limit = 10, offset = 0): Observable<ILogResponse<ILog[]>> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.requestFactory
      .get<ILog[]>(ApiEndpoints.LOGS, { params })
      .pipe(wrapArrayResponse<ILog[]>());
  }

  getErrorLogs(limit = 10, offset = 0): Observable<ILogResponse<IErrorLog[]>> {
    const params = new HttpParams().set('limit', limit.toString()).set('offset', offset.toString());

    return this.requestFactory
      .get<IErrorLog[]>(ApiEndpoints.LOGS_ERRORS, { params })
      .pipe(wrapArrayResponse<IErrorLog[]>());
  }

  getLogById(id: string): Observable<IBaseResponse<ILog>> {
    return this.requestFactory.getById<ILog>(ApiEndpoints.LOGS, id);
  }

  getErrorLogById(id: string): Observable<IBaseResponse<IErrorLog>> {
    return this.requestFactory.getById<IErrorLog>(ApiEndpoints.LOGS_ERRORS, id);
  }
}
