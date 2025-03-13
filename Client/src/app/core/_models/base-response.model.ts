export interface BaseResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  pagination?: IPagination;
  errors?: string[];
}

interface IPagination {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
}
