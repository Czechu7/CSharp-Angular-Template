import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { IReusableModalProps } from '../../types/resuable-modal.types';

@Component({
  selector: 'app-reusable-modal',
  standalone: true,
  imports: [DialogModule, CommonModule],
  templateUrl: './reusable-modal.component.html',
  styleUrl: './reusable-modal.component.scss',
})
export class ReusableModalComponent implements IReusableModalProps {
  @Input() header = 'Confirm';
  @Input() visible = false;
  @Input() draggable = true;
}
