import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLogsListComponent } from '../admin-logs-list/admin-logs-list/admin-logs-list.component';

@Component({
  selector: 'app-admin-logs',
  standalone: true,
  imports: [CommonModule, AdminLogsListComponent],
  templateUrl: './admin-logs.component.html',
  styleUrl: './admin-logs.component.scss',
})
export class AdminLogsComponent implements OnInit {
  currentTab: 'logs' | 'errors' = 'logs';

  constructor() {}

  ngOnInit() {}

  switchTab(tab: 'logs' | 'errors') {
    this.currentTab = tab;
  }
}
