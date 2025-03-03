import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { ApiEndpoints } from '../../_models/api-endpoints.enum';

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

  request<T>(
    method: string,
    endpoint: ApiEndpoints,
    body?: any,
    options?: { params?: HttpParams; headers?: HttpHeaders }
  ): Observable<T> {
    const headers = options?.headers
      ? options.headers
      : this.getDefaultHeaders();
    const params = options?.params ? options.params : this.getDefaultParams();

    const configuration = {
      headers,
      params,
      body,
    };

    return this.http.request<T>(
      method,
      `${environment.apiURL}/${endpoint}`,
      configuration
    );
  }

  get<T>(
    endpoint: ApiEndpoints,
    options?: { params?: HttpParams; headers?: HttpHeaders }
  ): Observable<T> {
    return this.request<T>('GET', endpoint, null, options);
  }

  post<T>(
    endpoint: ApiEndpoints,
    body: any,
    options?: { params?: HttpParams; headers?: HttpHeaders }
  ): Observable<T> {
    return this.request<T>('POST', endpoint, body, options);
  }

  put<T>(
    endpoint: ApiEndpoints,
    body: any,
    options?: { params?: HttpParams; headers?: HttpHeaders }
  ): Observable<T> {
    return this.request<T>('PUT', endpoint, body, options);
  }

  patch<T>(
    endpoint: ApiEndpoints,
    body: any,
    options?: { params?: HttpParams; headers?: HttpHeaders }
  ): Observable<T> {
    return this.request<T>('PATCH', endpoint, body, options);
  }

  delete<T>(
    endpoint: ApiEndpoints,
    options?: { params?: HttpParams; headers?: HttpHeaders }
  ): Observable<T> {
    return this.request<T>('DELETE', endpoint, null, options);
  }
}
