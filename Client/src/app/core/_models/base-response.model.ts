export interface IBaseResponseWithoutData {
  success: boolean;
  statusCode: number;
  message: string;
  errors?: string[];
}

export interface IBaseResponse<T> extends IBaseResponseWithoutData {
  data: T;
  pagination?: IPagination;
}

interface IPagination {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
