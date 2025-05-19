import { HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { IBaseResponse, IBaseResponseWithoutData } from '../../_models/base-response.model';
import {
  IFileEditRequestDto,
  IFileListResponseDto,
  IFileStatsDto,
} from '../../_models/DTOs/fileDto.model';
import { IFile } from '../../_models/file.model';
import { IQueryParams } from '../../_models/query-params.model';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  private requestFactory = inject(RequestFactoryService);

  sendFile(fileData: FormData): Observable<IBaseResponse<IFile>> {
    const options: IQueryParams = {
      headers: new HttpHeaders(),
    };

    return this.requestFactory.create<IFile, FormData>(ApiEndpoints.SEND_FILE, fileData, options);
  }

  downloadFile(fileId: string): void {
    this.requestFactory.getBlobById(ApiEndpoints.DOWNLOAD_FILE, fileId).subscribe({
      next: res => {
        const header = res.headers.get('Content-Disposition');
        const fileName = header?.match(/filename\*?=(?:UTF-8''|")?([^";]+)/)?.[1];
        if (!fileName || !res.body) return;

        const url = URL.createObjectURL(res.body);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      },
      error: error => {
        console.error('Failed to download file');
        console.error(error);
      },
    });
  }

  getImage(fileId: string): Observable<string> {
    return this.requestFactory
      .getBlobById(ApiEndpoints.DOWNLOAD_FILE, fileId)
      .pipe(map(res => URL.createObjectURL(res.body as Blob)));
  }

  getFile(fileId: string): Observable<IBaseResponse<IFile>> {
    return this.requestFactory.getById<IFile>(ApiEndpoints.GET_FILE, fileId);
  }

  getPageableFiles(
    pageNumber: number,
    pageSize: number,
  ): Observable<IBaseResponse<IFileListResponseDto>> {
    return this.requestFactory.getPaged<IFileListResponseDto>(ApiEndpoints.GET_FILES_LIST, {
      pageNumber,
      pageSize,
    });
  }

  editFile(fileId: string, fileName: string): Observable<IBaseResponseWithoutData> {
    return this.requestFactory.update<IBaseResponseWithoutData, IFileEditRequestDto>(
      ApiEndpoints.EDIT_FILE,
      fileId,
      { fileName },
    );
  }

  deleteFile(fileId: string): Observable<IBaseResponseWithoutData> {
    return this.requestFactory.delete<IBaseResponseWithoutData>(ApiEndpoints.DELETE_FILE, fileId);
  }

  getStats(): Observable<IBaseResponse<IFileStatsDto>> {
    return this.requestFactory.get<IFileStatsDto>(ApiEndpoints.GET_FILES_STATS);
  }
}
