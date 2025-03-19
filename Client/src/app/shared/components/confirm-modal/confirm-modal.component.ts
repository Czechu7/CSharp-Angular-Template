import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { IConfirmModalProps } from '../../types/modal.types';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [DialogModule, CommonModule, ButtonModule, ButtonComponent],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss',
})
export class ConfirmModalComponent implements IConfirmModalProps {
  @Input() header = 'Confirm';
  @Input() visible = false;
  @Input() message = 'Are you sure?';
  @Input() yesLabel = 'Yes';
  @Input() noLabel = 'No';
  @Output() yes = new EventEmitter<void>();
  @Output() no = new EventEmitter<void>();

  onYes() {
    this.yes.emit();
    this.visible = false;
  }

  onNo() {
    this.no.emit();
    this.visible = false;
  }
}
