import { IFile } from '../file.model';
import { IPagedQueryParams } from '../paged-query-params.model';

export interface IFileListResponseDto {
  content: IFile[];
  pageable: IPageableFileResponseDto;
}

interface IPageableFileResponseDto {
  totalElements: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface IFileEditRequestDto {
  fileName: string;
}

export interface IFileStatsDto {
  totalSizeBytes: number;
  totalSizeGB: number;
  maxSizeGB: number;
  minSizeGB: number;
  usagePrecentages: number;
  totalFiles: number;
  hasAvailableStorage: boolean;
  avaiableSizeBytes: number;
  avaiableSizeGB: number;
}
