import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { isErrorLog, LogType } from '../../../../app/core/_models/log.model';
import { RouterEnum } from '../../../enums/router.enum';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-log-item',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './log-item.component.html',
  styleUrl: './log-item.component.scss',
})
export class LogItemComponent implements OnInit {
  @Input() log!: LogType;
  @Input() isError = false;

  title = '';
  content = '';
  dateTime = '';
  ipAddress = '';
  logId = '';

  RouterEnum = RouterEnum;

  constructor(private router: Router) {}

  ngOnInit() {
    this.logId = this.log.id;
    this.dateTime = new Date(this.log.timestamp).toLocaleString();

    if (isErrorLog(this.log)) {
      this.title = this.log.exceptionType;
      this.content = this.log.exceptionMessage;
      this.ipAddress = this.log.userId;
      this.isError = true;
    } else {
      this.title = this.log.action;
      this.content = this.log.message;
      this.ipAddress = this.log.ipAddress;
    }
  }

  showDetails() {
    this.router.navigate([RouterEnum.logs, this.logId]);
  }
}
