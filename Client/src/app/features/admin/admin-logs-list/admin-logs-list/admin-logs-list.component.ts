import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LogItemComponent } from '../../../../shared/components/log-item/log-item.component';
import { AdminLogsService } from '../../../../core/_services/admin-logs/admin-logs.service';
import { LogType as LogData } from '../../../../core/_models/log.model';
import {
  PaginationService,
  PaginationState,
} from '../../../../core/_services/pagination/pagination.service';
import { InfiniteScrollDirective } from '../../../../shared/directives/infinite-scroll/infinite-scroll.directive';
import { TranslateModule } from '@ngx-translate/core';
import { LogEnum } from '../../../../enums/log-type.enum';

@Component({
  selector: 'app-admin-logs-list',
  standalone: true,
  imports: [CommonModule, LogItemComponent, InfiniteScrollDirective, TranslateModule],
  templateUrl: './admin-logs-list.component.html',
  styleUrl: './admin-logs-list.component.scss',
})
export class AdminLogsListComponent implements OnInit, OnDestroy {
  @Input() logType: LogEnum = LogEnum.Regular;

  LogType = LogEnum;
  logs: LogData[] = [];
  paginationState: PaginationState | null = null;
  private paginationSubscription!: Subscription;

  private logsService = inject(AdminLogsService);
  private paginationService = inject(PaginationService);

  ngOnInit() {
    this.paginationService.resetPagination();
    this.paginationSubscription = this.paginationService.getPaginationState().subscribe(state => {
      this.paginationState = state;
      if (state.isLoading) {
        this.loadLogs();
      }
    });

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

    if (this.logType === LogEnum.Regular) {
      this.logsService.getLogs(limit, offset).subscribe({
        next: response => {
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
