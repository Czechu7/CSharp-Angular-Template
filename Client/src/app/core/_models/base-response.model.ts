export interface IBaseResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: IPagination;
  errors?: string[];
}

export interface IBaseResponseWithoutData {
  success: boolean;
  message: string;
}

interface IPagination {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
}
