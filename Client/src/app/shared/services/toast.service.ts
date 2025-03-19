import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import type { IKeys, ISeverity } from '../types/toast.types';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  messageService = inject(MessageService);

  show(severity: ISeverity, summary: string, detail: string, key?: IKeys, life?: number) {
    this.messageService.add({
      severity,
      summary,
      detail,
      key,
      life,
    });
  }

  showSuccess(summary: string, detail: string, key?: IKeys, life?: number) {
    this.show('success', summary, detail, key, life);
  }

  showInfo(summary: string, detail: string, key?: IKeys, life?: number) {
    this.show('info', summary, detail, key, life);
  }

  showWarning(summary: string, detail: string, key?: IKeys, life?: number) {
    this.show('warn', summary, detail, key, life);
  }

  showError(summary: string, detail: string, key?: IKeys, life?: number) {
    this.show('error', summary, detail, key, life);
  }

  clear(key?: string) {
    this.messageService.clear(key);
  }
}
