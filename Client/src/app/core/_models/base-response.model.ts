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

export interface IPagination {
  pageSize: number;
  pageNumber: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
