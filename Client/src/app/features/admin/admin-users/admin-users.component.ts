import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../shared/components/table/table.component';
import { ITableActionButton, ITableColumn } from '../../../shared/types/table.types';
import { MenuItem } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AdminService } from '../../../core/_services/admin/admin.service';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';
import { IUserAdmin } from '../../../core/_models/user-admin.model';
import { Router } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [TableComponent, ConfirmModalComponent, TranslateModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss',
})
export class AdminUsersComponent implements OnInit {
  private adminService = inject(AdminService);
  private router = inject(Router);
  private translateService = inject(TranslateService);
  private toastService = inject(ToastService);

  users: IUserAdmin[] = [];
  loading: boolean = false;
  totalRecords: number = 0;

  // TABLE
  columns: ITableColumn[] = [
    { field: 'userName', header: 'ADMIN.USERS.USERNAME' },
    { field: 'firstName', header: 'ADMIN.USERS.FIRST_NAME' },
    { field: 'lastName', header: 'ADMIN.USERS.LAST_NAME' },
    { field: 'email', header: 'ADMIN.USERS.EMAIL' },
    { field: 'roles', header: 'ADMIN.USERS.ROLE' },
    { field: 'isActive', header: 'ADMIN.USERS.STATUS' },
  ];

  actionButtons: ITableActionButton[] = [
    { icon: 'pi pi-pencil', ariaLabel: 'ADMIN.USERS.EDIT', action: 'edit' },
    { icon: 'pi pi-eye', ariaLabel: 'ADMIN.USERS.VIEW', action: 'view' },
    { icon: 'pi pi-trash', severity: 'danger', ariaLabel: 'ADMIN.USERS.DELETE', action: 'delete' },
  ];

  contextMenuItems: MenuItem[] = [
    { label: 'ADMIN.USERS.EDIT', icon: 'pi pi-pencil', id: 'edit' },
    { label: 'ADMIN.USERS.VIEW', icon: 'pi pi-eye', id: 'view' },
    { label: 'ADMIN.USERS.DELETE', icon: 'pi pi-trash', id: 'delete' },
  ];

  // MODAL
  showConfirmModal: boolean = false;
  userToDelete: IUserAdmin | null = null;
  confirmModalHeader: string = 'ADMIN.USERS.DELETE_CONFIRMATION';
  confirmModalMessage: string = 'ADMIN.USERS.DELETE_CONFIRMATION_MESSAGE';
  confirmModalMessageName: string = '';
  confirmModalYesLabel: string = 'UTILS.YES';
  confirmModalNoLabel: string = 'UTILS.NO';

  ngOnInit(): void {
    this.loadUsers({ page: 0, rows: 5 });
  }

  loadUsers(event?: { page: number; rows: number }): void {
    this.loading = true;
    const pageNumber = event ? event.page + 1 : 1;
    const pageSize = event ? event.rows : 10;

    this.adminService.getPagedUsers({ pageNumber, pageSize }).subscribe({
      next: response => {
        this.users = response.data.items;
        this.totalRecords = response.data.pagination!.totalCount;
      },
      error: error => {
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  refreshUsers(): void {
    this.loadUsers({ page: 0, rows: 5 });
  }

  handleAction(event: { action: string; item: IUserAdmin }): void {
    switch (event.action) {
      case 'edit':
        this.router.navigate(['admin', 'users', event.item.id]);
        break;
      case 'view':
        console.log('View:', event.item);
        break;
      case 'delete':
        this.userToDelete = event.item;
        this.confirmModalMessageName = `${event.item.firstName} ${event.item.lastName} - `;
        this.showConfirmModal = true;
        break;
    }
  }

  handleContextMenuAction(event: { action: Event; item: IUserAdmin }): void {
    const target = event.action.target as HTMLElement;
    const action = target.closest('[id]')?.getAttribute('id');

    if (action) {
      this.handleAction({ action, item: event.item });
    }
  }

  onConfirmDelete(): void {
    if (this.userToDelete) {
      console.log('Delete:', this.userToDelete);
      this.adminService.deleteUser(this.userToDelete.id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== this.userToDelete?.id);
        },
        error: error => {
          console.error('Error deleting user:', error);
        },
        complete: () => {
          this.showConfirmModal = false;
          this.userToDelete = null;
          this.toastService.showSuccess(
            this.translateService.instant('ADMIN.USERS.TITLE'),
            this.translateService.instant('ADMIN.USERS.SUCCESS_DELETE_ACCOUNT_MESSAGE'),
          );
        },
      });
    }
  }

  onCancelDelete(): void {
    this.showConfirmModal = false;
    this.userToDelete = null;
  }
}
