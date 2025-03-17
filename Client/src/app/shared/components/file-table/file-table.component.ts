import { Component, EventEmitter, inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { ContextMenuComponent } from '../context-menu/context-menu.component';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { RouterEnum } from '../../../enums/router.enum';
import { IFileItem, IFileTableProps, Position } from '../../types/file-type.types';

@Component({
  selector: 'app-file-table',
  standalone: true,
  imports: [
    TableModule,
    TooltipModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    ButtonComponent,
    InputComponent,
    ContextMenuComponent,
  ],
  templateUrl: './file-table.component.html',
  styleUrl: './file-table.component.scss',
})
export class FileTableComponent implements OnInit, IFileTableProps {
  @Input() files: IFileItem[] = [];
  @Input() enablePagination = true;
  @Input() rowsPerPage = 10;
  @Input() showActions = true;
  @Input() showSearchBar = true;
  @Input() showActionButtons = true;
  @Input() defaultSortField = 'name';
  @Input() defaultSortOrder = 1;
  @Input() loading = false;
  @Input() totalRecords = 0;
  @Input() paginatorPosition: Position = 'bottom';
  @Output() onPageChange = new EventEmitter<{ page: number; rows: number }>();
  @Output() fileAction = new EventEmitter<{ action: string; file: IFileItem }>();

  @ViewChild('fileContextMenu') fileContextMenu!: ContextMenuComponent;

  searchControl = new FormControl('');
  contextMenuItems: MenuItem[] = [];
  selectedFile: IFileItem | null = null;

  private translateService = inject(TranslateService);
  private router = inject(Router);
  private langChangeSubscription: Subscription | null = null;

  ngOnInit() {
    this.initContextMenuItems();

    this.langChangeSubscription = this.translateService.onLangChange.subscribe(() => {
      this.initContextMenuItems();
    });
  }

  initContextMenuItems() {
    this.contextMenuItems = [
      {
        label: this.translateService.instant('FILE_TABLE.DOWNLOAD'),
        icon: 'pi pi-download',
        command: () => this.onFileAction('download', this.selectedFile!),
      },
      {
        label: this.translateService.instant('FILE_TABLE.PREVIEW'),
        icon: 'pi pi-eye',
        command: () => this.onFileAction('preview', this.selectedFile!),
      },
      {
        label: this.translateService.instant('FILE_TABLE.DELETE'),
        icon: 'pi pi-trash',
        styleClass: 'p-error',
        command: () => this.onFileAction('delete', this.selectedFile!),
      },
    ];
  }
  onFileContextMenu(event: MouseEvent, file: IFileItem) {
    this.selectedFile = file;
    this.fileContextMenu.show(event);
    event.preventDefault();
  }

  handleContextMenuAction(event: { originalEvent: Event; item: MenuItem }) {
    console.log('Context menu action', event);
  }

  getFileIcon(file: IFileItem): string {
    if (file.icon) return file.icon;

    const iconMap: Record<string, string> = {
      pdf: 'pi pi-file-pdf',
      doc: 'pi pi-file-word',
      docx: 'pi pi-file-word',
      xls: 'pi pi-file-excel',
      xlsx: 'pi pi-file-excel',
      ppt: 'pi pi-file',
      pptx: 'pi pi-file',
      jpg: 'pi pi-image',
      jpeg: 'pi pi-image',
      png: 'pi pi-image',
      gif: 'pi pi-image',
      txt: 'pi pi-file',
      zip: 'pi pi-file',
      folder: 'pi pi-folder',
    };

    const fileType = file.type.toLowerCase();
    return iconMap[fileType] || 'pi pi-file';
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal(event, 'contains');
  }

  onFileAction(action: 'download' | 'preview' | 'delete', file: IFileItem) {
    console.log(`Action ${action} on file: ${file.name}`);
    this.fileAction.emit({ action, file });

    if (action === 'preview') {
      this.router.navigate([RouterEnum.fileDetails], {
        queryParams: {
          id: file.id,
          name: file.name,
          type: file.type,
        },
      });
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private downloadFile(file: IFileItem): void {
    // Implement download logic
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private deleteFile(file: IFileItem): void {
    // Implement delete logic
  }

  onRefresh() {
    console.log('Refreshing file list');
  }
}
