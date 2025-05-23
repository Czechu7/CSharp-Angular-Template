import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AdminLogsListComponent } from '../admin-logs-list/admin-logs-list/admin-logs-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { LogEnum } from '../../../enums/log-type.enum';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule, AdminLogsListComponent, TranslateModule],
  templateUrl: './admin-logs.component.html',
  styleUrl: './admin-logs.component.scss',
})
export class AdminLogsComponent {
  LogType = LogEnum;
  currentTab: LogEnum = LogEnum.Regular;

  switchTab(tab: LogEnum): void {
    this.currentTab = tab;
  }
}
