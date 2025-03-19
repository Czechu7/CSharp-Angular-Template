import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IButtonIconPosition,
  IButtonBadgeSeverity,
  IButtonSeverity,
  IButtonVariant,
  IButtonSize,
  IButtonProps,
} from '../../types/button.types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements IButtonProps {
  @Input() label?: string;
  @Input() icon?: string;
  @Input() iconPos: IButtonIconPosition = 'left';
  @Input() badge?: string;
  @Input() badgeSeverity: IButtonBadgeSeverity = 'info';
  @Input() severity: IButtonSeverity = 'primary';
  @Input() raised = false;
  @Input() rounded = false;
  @Input() loading = false;
  @Input() disabled = false;
  @Input() variant?: IButtonVariant;
  @Input() outlined = false;
  @Input() size?: IButtonSize;
  @Input() styleClass?: string;
  @Input() ariaLabel?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  @Output() onClick = new EventEmitter<MouseEvent>();
}
