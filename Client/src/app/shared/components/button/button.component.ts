import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonIconPosition,
  ButtonBadgeSeverity,
  ButtonSeverity,
  ButtonVariant,
  ButtonSize,
  ButtonProps,
} from '../../types/button.types';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements ButtonProps {
  @Input() label?: string;
  @Input() icon?: string;
  @Input() iconPos: ButtonIconPosition = 'left';
  @Input() badge?: string;
  @Input() badgeSeverity: ButtonBadgeSeverity = 'info';
  @Input() severity: ButtonSeverity = 'primary';
  @Input() raised: boolean = false;
  @Input() rounded: boolean = false;
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() variant?: ButtonVariant;
  @Input() outlined: boolean = false;
  @Input() size?: ButtonSize;
  @Input() styleClass?: string;
  @Input() ariaLabel?: string;

  @Output() onClick = new EventEmitter<MouseEvent>();
}
