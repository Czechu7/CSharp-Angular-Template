import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LogItemComponent } from '../../../../shared/components/log-item/log-item.component';
import { AdminLogsService } from '../../../../core/_services/admin-logs/admin-logs.service';
import { LogType } from '../../../../core/_models/log.model';
import {
  PaginationService,
  PaginationState,
} from '../../../../core/_services/pagination/pagination.service';
import { InfiniteScrollDirective } from '../../../../shared/directives/infinite-scroll/infinite-scroll.directive';

@Component({
  selector: 'app-admin-logs-list',
  standalone: true,
  imports: [CommonModule, LogItemComponent, InfiniteScrollDirective],
  templateUrl: './admin-logs-list.component.html',
  styleUrl: './admin-logs-list.component.scss',
})
export class AdminLogsListComponent implements OnInit, OnDestroy {
  @Input() logType: 'logs' | 'errors' = 'logs';

  logs: LogType[] = [];
  paginationState: PaginationState | null = null;
  private paginationSubscription!: Subscription;

  constructor(
    private logsService: AdminLogsService,
    private paginationService: PaginationService,
  ) {}

  ngOnInit() {
    this.paginationService.resetPagination();
    this.paginationSubscription = this.paginationService.getPaginationState().subscribe(state => {
      this.paginationState = state;
      if (state.isLoading) {
        this.loadLogs();
      }
    });

    // Initial load after component is ready
    setTimeout(() => this.paginationService.nextPage(), 0);
  }

  ngOnDestroy() {
    if (this.paginationSubscription) {
      this.paginationSubscription.unsubscribe();
    }
  }

  loadLogs() {
    if (!this.paginationState) return;

    const { limit, offset } = this.paginationState;

    if (this.logType === 'logs') {
      this.logsService.getLogs(limit, offset).subscribe({
        next: response => {
          console.log('Response:', response); // Debugging line
          // Fix: Ensure response and data exist before checking length
          if (!response || !response.data) {
            this.paginationService.setLoading(false);
            return;
          }

          if (response.data.length === 0) {
            this.paginationService.setReachedEnd(true);
          } else {
            this.logs = [...this.logs, ...response.data];
          }
          this.paginationService.setLoading(false);
        },
        error: () => {
          this.paginationService.setLoading(false);
        },
      });
    } else {
      this.logsService.getErrorLogs(limit, offset).subscribe({
        next: response => {
          // Fix: Ensure response and data exist before checking length
          if (!response || !response.data) {
            this.paginationService.setLoading(false);
            return;
          }

          if (response.data.length === 0) {
            this.paginationService.setReachedEnd(true);
          } else {
            this.logs = [...this.logs, ...response.data];
          }
          this.paginationService.setLoading(false);
        },
        error: () => {
          this.paginationService.setLoading(false);
        },
      });
    }
  }

  onScroll() {
    if (
      this.paginationState &&
      !this.paginationState.isLoading &&
      !this.paginationState.reachedEnd
    ) {
      this.paginationService.nextPage();
    }
  }

  reset() {
    this.logs = [];
    this.paginationService.resetPagination();
    this.paginationService.nextPage();
  }
}
