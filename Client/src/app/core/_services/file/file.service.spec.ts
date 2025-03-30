import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { FileService } from './file.service';
import { RequestFactoryService } from '../httpRequestFactory/request-factory.service';
import { ApiEndpoints } from '../../../enums/api-endpoints.enum';
import { IBaseResponse } from '../../_models/base-response.model';
import { IFile } from '../../_models/file.model';
import { IFileStatsDto } from '../../_models/DTOs/fileDto.model';

describe('FileService', () => {
  let service: FileService;
  let requestFactorySpy: jasmine.SpyObj<RequestFactoryService>;

  beforeEach(() => {
    const fileServiceSpy = jasmine.createSpyObj('RequestFactoryService', [
      'create',
      'getBlobById',
      'getById',
      'getPaged',
      'update',
      'delete',
      'get',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FileService, { provide: RequestFactoryService, useValue: fileServiceSpy }],
    });

    service = TestBed.inject(FileService);
    requestFactorySpy = TestBed.inject(
      RequestFactoryService
    ) as jasmine.SpyObj<RequestFactoryService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send files correctly', () => {
    const mockFormData = new FormData();
    mockFormData.append('file', new Blob(['test']), 'test.txt');

    const mockResponse: IBaseResponse<IFile> = {
      success: true,
      statusCode: 200,
      message: 'File uploaded successfully',
      data: {
        id: '1',
        fileName: 'test.txt',
        size: 12,
        createdAt: '2025-04-02T12:09:10.543Z',
        originalFileName: 'test_original.txt',
        contentType: 'text/plain',
      },
    };

    requestFactorySpy.create.and.returnValue(of(mockResponse));

    let result: any;
    service.sendFile(mockFormData).subscribe(res => {
      result = res;
    });

    expect(requestFactorySpy.create).toHaveBeenCalledWith(
      ApiEndpoints.SEND_FILE,
      mockFormData,
      jasmine.any(Object)
    );
    expect(result).toBe(mockResponse);
  });

  it('should get file stats', () => {
    const mockStats: IBaseResponse<IFileStatsDto> = {
      success: true,
      statusCode: 200,
      message: 'File stats retrieved successfully',
      data: {
        totalSizeBytes: 5242880,
        totalSizeGB: 0.005,
        maxSizeGB: 1,
        minSizeGB: 0,
        usagePercentages: 0.5,
        totalFiles: 10,
        hasAvailableStorage: true,
        availableSizeBytes: 1048576000,
        availableSizeGB: 0.995,
      },
    };

    requestFactorySpy.get.and.returnValue(of(mockStats));

    let response: IBaseResponse<IFileStatsDto> | undefined;
    service.getStats().subscribe(res => {
      response = res;
    });

    expect(requestFactorySpy.get).toHaveBeenCalledWith(ApiEndpoints.GET_FILES_STATS);
    expect(response).toEqual(mockStats);
  });

  it('should get a file by id', () => {
    const fileId = 'abc-123';
    const mockFile: IBaseResponse<IFile> = {
      success: true,
      statusCode: 200,
      message: 'File retrieved successfully',
      data: {
        id: fileId,
        fileName: 'document.pdf',
        size: 1024000,
        createdAt: '2023-05-10T12:30:45Z',
        originalFileName: 'document_original.pdf',
        contentType: 'application/pdf',
      },
    };

    requestFactorySpy.getById.and.returnValue(of(mockFile));

    service.getFile(fileId).subscribe(file => {
      expect(file).toBe(mockFile);
    });

    expect(requestFactorySpy.getById).toHaveBeenCalledWith(ApiEndpoints.GET_FILE, fileId);
  });
});
