import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminLogsListComponent } from '../admin-logs-list/admin-logs-list/admin-logs-list.component';
import { TranslateModule } from '@ngx-translate/core';

export enum LogType {
  Regular = 'logs',
  Error = 'errors',
}

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule, AdminLogsListComponent, TranslateModule],
  templateUrl: './admin-logs.component.html',
  styleUrl: './admin-logs.component.scss',
})
export class AdminLogsComponent {
  LogType = LogType; // Export to template
  currentTab: LogType = LogType.Regular;

  switchTab(tab: LogType): void {
    this.currentTab = tab;
  }
}
