import { IFile } from '../file.model';

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
  usagePercentages: number;
  totalFiles: number;
  hasAvailableStorage: boolean;
  availableSizeBytes: number;
  availableSizeGB: number;
}
