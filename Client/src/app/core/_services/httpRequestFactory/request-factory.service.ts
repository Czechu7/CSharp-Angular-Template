import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { IBaseResponse } from '../../_models/base-response.model';
import { IPagedQueryParams } from '../../_models/paged-query-params.model';
import { IQueryParams } from '../../_models/query-params.model';

@Injectable({
  providedIn: 'root',
})
export class RequestFactoryService {
  private http = inject(HttpClient);

  get<T>(endpoint: ApiEndpoints, options?: IQueryParams): Observable<IBaseResponse<T>> {
    return this.request<T>('GET', endpoint, null, options);
  }

  post<T, B>(
    endpoint: ApiEndpoints,
    body: B,
    options?: IQueryParams,
  ): Observable<IBaseResponse<T>> {
    return this.request<T, B>('POST', endpoint, body, options);
  }

  getAll<T>(endpoint: ApiEndpoints, options?: IQueryParams): Observable<IBaseResponse<T>> {
    return this.request<T>('GET', endpoint, null, options);
  }

  getById<T>(
    endpoint: ApiEndpoints,
    id: string,
    options?: IQueryParams,
  ): Observable<IBaseResponse<T>> {
    return this.request<T>('GET', `${endpoint}/${id}`, null, options);
  }

  getBlobById(endpoint: ApiEndpoints, id: string): Observable<HttpResponse<Blob>> {
    return this.http.get(`${environment.apiURL}/${endpoint}/${id}`, {
      responseType: 'blob',
      observe: 'response',
    });
  }

  getPaged<T>(
    endpoint: ApiEndpoints,
    queryParams: IPagedQueryParams,
    options?: IQueryParams,
  ): Observable<IBaseResponse<T>> {
    const pageNumber = queryParams.pageNumber > 0 ? queryParams.pageNumber : 1;
    const pageSize = queryParams.pageSize > 0 ? queryParams.pageSize : 10;

    let params = options?.params ? options.params : this.getDefaultParams();
    params = params.set('pageNumber', pageNumber.toString()).set('pageSize', pageSize.toString());

    if (queryParams.filter) {
      params = params.set('filter', queryParams.filter);
    }

    if (queryParams.sortBy) {
      params = params.set('sortBy', queryParams.sortBy);
    }

    if (queryParams.sortDescending) {
      params = params.set('sortDescending', queryParams.sortDescending.toString());
    }

    if (queryParams.includeInactive) {
      params = params.set('includeInactive', queryParams.includeInactive.toString());
    }

    return this.request<T>('GET', endpoint, null, { params });
  }

  create<T, B>(
    endpoint: ApiEndpoints,
    body: B,
    options?: IQueryParams,
  ): Observable<IBaseResponse<T>> {
    return this.request<T, B>('POST', endpoint, body, options);
  }

  update<T, B>(
    endpoint: ApiEndpoints,
    id: string,
    body: B,
    options?: IQueryParams,
  ): Observable<IBaseResponse<T>> {
    return this.request<T, B>('PUT', `${endpoint}/${id}`, body, options);
  }

  patch<T, B>(
    endpoint: ApiEndpoints,
    id: string,
    body: B,
    options?: IQueryParams,
  ): Observable<IBaseResponse<T>> {
    return this.request<T, B>('PATCH', `${endpoint}/${id}`, body, options);
  }

  delete<T>(
    endpoint: ApiEndpoints,
    id: string,
    options?: IQueryParams,
  ): Observable<IBaseResponse<T>> {
    return this.request<T, { isDeleted: number }>(
      'PATCH',
      `${endpoint}/${id}`,
      { isDeleted: 1 },
      options,
    );
  }

  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private getDefaultParams(): HttpParams {
    return new HttpParams();
  }

  private request<T, B = undefined>(
    method: string,
    endpoint: ApiEndpoints | string,
    body?: B | null | undefined,
    options?: IQueryParams,
  ): Observable<IBaseResponse<T>> {
    const headers = options?.headers ? options.headers : this.getDefaultHeaders();
    const params = options?.params ? options.params : this.getDefaultParams();

    const configuration = {
      headers,
      params,
      body,
    };

    return this.http.request<IBaseResponse<T>>(
      method,
      `${environment.apiURL}/${endpoint}`,
      configuration,
    );
  }
}
