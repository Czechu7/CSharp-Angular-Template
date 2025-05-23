import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LogType, isErrorLog } from '../../../../app/core/_models/log.model';
import { RouterEnum } from '../../../enums/router.enum';

@Component({
  selector: 'app-log-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './log-item.component.html',
  styleUrl: './log-item.component.scss',
})
export class LogItemComponent {
  @Input() log!: LogType;
  @Input() isError = false;

  RouterEnum = RouterEnum;
  isErrorLog = isErrorLog; 
  private router = inject(Router);

  showDetails() {
    this.router.navigate([RouterEnum.logs, this.log.id]);
  }
}
