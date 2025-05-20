import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import {
  IContextMenuAction,
  ITableActionButton,
  ITableColumn,
  ITableProps,
  Position,
} from '../../types/table.types';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { ButtonComponent } from '../button/button.component';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { InputComponent } from '../input/input.component';
import { TranslateModule } from '@ngx-translate/core';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonComponent,
    InputComponent,
    ContextMenuComponent,
    TooltipModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T = unknown> implements ITableProps<T> {
  @Input() cols: ITableColumn[] = [];
  @Input() data: T[] = [];
  @Input() headerTitle?: string;
  @Input() footerTitle?: string;
  @Input() showGridlines = false;
  @Input() stripedRows = false;
  @Input() rowsPerPage = 5;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() enablePaginator = true;
  @Input() enableResizableColumns = true;
  @Input() minWidth = '50rem';
  @Input() showActions = true;
  @Input() showSearchBar = true;
  @Input() showActionButtons = true;
  @Input() defaultSortField = 'name';
  @Input() defaultSortOrder = 1;
  @Input() loading = false;
  @Input() totalRecords = 0;
  @Input() paginatorPosition: Position = 'bottom';
  @Input() contextMenuItems: MenuItem[] = [];
  @Input() actionButtons: ITableActionButton[] = [
    { icon: 'pi pi-download', ariaLabel: 'TABLE.DOWNLOAD', action: 'download' },
    { icon: 'pi pi-eye', ariaLabel: 'TABLE.PREVIEW', action: 'preview' },
    { icon: 'pi pi-trash', severity: 'danger', ariaLabel: 'TABLE.DELETE', action: 'delete' },
  ];

  @Output() onPageChange = new EventEmitter<{ page: number; rows: number }>();
  @Output() onActionEvent = new EventEmitter<{ action: string; item: T }>();
  @Output() onRefreshEvent = new EventEmitter<void>();
  @Output() onContextMenuActionEvent = new EventEmitter<{ action: Event; item: T }>();

  @ViewChild('dt') table!: Table;
  @ViewChild('contextMenu') contextMenu!: ContextMenuComponent;

  searchControl = new FormControl('');
  selectedItem: T | null = null;

  onGlobalFilter(table: Table, event: string): void {
    table.filterGlobal(event, 'contains');
  }

  onRefresh(): void {
    this.onRefreshEvent.emit();
  }

  onAction(action: string, item: T): void {
    this.onActionEvent.emit({ action, item });
  }

  handleContextMenuAction(actionData: IContextMenuAction): void {
    if (this.selectedItem) {
      this.onContextMenuActionEvent.emit({
        action: actionData.originalEvent,
        item: this.selectedItem,
      });
    }
  }

  showContextMenu(event: MouseEvent, item: T): void {
    this.selectedItem = item;
    this.contextMenu.show(event);
    event.preventDefault();
  }
}
