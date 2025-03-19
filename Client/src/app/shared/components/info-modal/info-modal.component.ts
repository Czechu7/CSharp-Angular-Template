import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { IInfoModalProps } from '../../types/modal.types';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-info-modal',
  standalone: true,
  imports: [DialogModule, CommonModule, ButtonModule, ButtonComponent],
  templateUrl: './info-modal.component.html',
  styleUrl: './info-modal.component.scss',
})
export class InfoModalComponent implements IInfoModalProps {
  @Input() header = 'Information';
  @Input() visible = false;
  @Input() message = 'Default information message';
}
