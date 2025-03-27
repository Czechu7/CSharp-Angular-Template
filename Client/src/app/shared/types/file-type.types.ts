import { EventEmitter } from '@angular/core';

export type Position = 'top' | 'bottom' | 'both';

export interface IFileItem {
  id?: string;
  name: string;
  type: string;
  size: number;
  lastModified: Date;
  icon?: string;
}

export interface IFileTableProps {
  files: IFileItem[];
  enablePagination: boolean;
  rowsPerPage: number;
  showActions: boolean;
  showSearchBar: boolean;
  showActionButtons: boolean;
  defaultSortField: string;
  defaultSortOrder: number;
  loading: boolean;
  totalRecords: number;
  paginatorPosition: Position;
  onPageChange: EventEmitter<{ page: number; rows: number }>;
  fileAction: EventEmitter<{ action: string; file: IFileItem }>;
}
