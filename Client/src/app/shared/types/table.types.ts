import { EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';

export type Position = 'top' | 'bottom' | 'both';

export interface ITableColumn {
  field: string;
  header: string;
}

export interface ITableActionButton {
  icon: string;
  severity?: string;
  ariaLabel: string;
  action: string;
}

export interface IContextMenuAction {
  originalEvent: Event;
  item: MenuItem;
}

export interface ITableProps<T> {
  cols: ITableColumn[];
  data: T[];
  headerTitle?: string;
  footerTitle?: string;
  showGridlines?: boolean;
  stripedRows?: boolean;
  rowsPerPage?: number;
  rowsPerPageOptions?: number[];
  enablePaginator?: boolean;
  enableResizableColumns?: boolean;
  minWidth?: string;
  showActions: boolean;
  showSearchBar: boolean;
  showActionButtons: boolean;
  defaultSortField: string;
  defaultSortOrder: number;
  loading: boolean;
  totalRecords: number;
  paginatorPosition: Position;
  contextMenuItems: MenuItem[];
  actionButtons: ITableActionButton[];
  onPageChange: EventEmitter<{ page: number; rows: number }>;
  onActionEvent: EventEmitter<{ action: string; item: T }>;
  onRefreshEvent: EventEmitter<void>;
  onContextMenuActionEvent: EventEmitter<{ action: Event; item: T }>;
}
