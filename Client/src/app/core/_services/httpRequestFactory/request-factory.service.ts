import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';
import { BaseResponse } from '../../_models/base-response.model';
import { IPagedQueryParams } from '../../_models/paged-query-params.model';
import { IQueryParams } from '../../_models/query-params.model';

@Injectable({
  providedIn: 'root',
})
export class RequestFactoryService {
  constructor(private http: HttpClient) {}

  private getDefaultHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }

  private getDefaultParams(): HttpParams {
    return new HttpParams();
  }

  private request<T>(
    method: string,
    endpoint: ApiEndpoints | string,
    body?: any,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    const headers = options?.headers
      ? options.headers
      : this.getDefaultHeaders();
    const params = options?.params ? options.params : this.getDefaultParams();

    const configuration = {
      headers,
      params,
      body,
    };

    return this.http.request<BaseResponse<T>>(
      method,
      `${environment.apiURL}/${endpoint}`,
      configuration
    );
  }

  get<T>(
    endpoint: ApiEndpoints,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    return this.request<T>('GET', endpoint, null, options);
  }

  post<T>(
    endpoint: ApiEndpoints,
    body: any,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    return this.request<T>('POST', endpoint, body, options);
  }

  getAll<T>(
    endpoint: ApiEndpoints,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    return this.request<T>('GET', endpoint, null, options);
  }

  getById<T>(
    endpoint: ApiEndpoints,
    id: string,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    return this.request<T>('GET', `${endpoint}/${id}`, null, options);
  }

  getPaged<T>(
    endpoint: ApiEndpoints,
    queryParams: IPagedQueryParams,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    const pageNumber = queryParams.pageNumber > 0 ? queryParams.pageNumber : 1;
    const pageSize = queryParams.pageSize > 0 ? queryParams.pageSize : 10;

    let params = options?.params ? options.params : this.getDefaultParams();
    params = params
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (queryParams.filter) {
      params = params.set('filter', queryParams.filter);
    }

    if (queryParams.sortBy) {
      params = params.set('sortBy', queryParams.sortBy);
    }

    if (queryParams.sortDescending) {
      params = params.set(
        'sortDescending',
        queryParams.sortDescending.toString()
      );
    }

    if (queryParams.includeInactive) {
      params = params.set(
        'includeInactive',
        queryParams.includeInactive.toString()
      );
    }

    return this.request<T>('GET', endpoint, null, { params });
  }

  create<T>(
    endpoint: ApiEndpoints,
    body: any,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    return this.request<T>('POST', endpoint, body, options);
  }

  update<T>(
    endpoint: ApiEndpoints,
    id: string,
    body: any,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    return this.request<T>('PUT', `${endpoint}/${id}`, body, options);
  }

  patch<T>(
    endpoint: ApiEndpoints,
    id: string,
    body: any,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    return this.request<T>('PATCH', `${endpoint}/${id}`, body, options);
  }

  delete<T>(
    endpoint: ApiEndpoints,
    id: string,
    options?: IQueryParams
  ): Observable<BaseResponse<T>> {
    return this.request<T>('DELETE', `${endpoint}/${id}`, null, options);
  }
}
