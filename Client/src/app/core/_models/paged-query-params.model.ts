export interface IPagedQueryParams {
  pageNumber: number;
  pageSize: number;
  filter?: string;
  sortBy?: string;
  sortDescending?: boolean;
  includeInactive?: boolean;
}
