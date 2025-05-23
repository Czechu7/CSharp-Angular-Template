import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminLogsListComponent } from '../admin-logs-list/admin-logs-list/admin-logs-list.component';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule, AdminLogsListComponent],
  templateUrl: './admin-logs.component.html',
  styleUrl: './admin-logs.component.scss',
})
export class AdminLogsComponent {
  currentTab: 'logs' | 'errors' = 'logs';

  switchTab(tab: 'logs' | 'errors') {
    this.currentTab = tab;
  }
}
