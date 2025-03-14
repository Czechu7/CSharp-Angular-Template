import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FooterProps } from '../../types/footer.types';
import { MenuItem } from '../../types/navbar.types';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslateModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements FooterProps {
  @Input() logo?: string;
  @Input() title?: string;
  @Input() links: MenuItem[] = [];
  @Input() socialLinks: MenuItem[] = [];
  @Input() customClass?: string;

  get currentYear(): number {
    return new Date().getFullYear();
  }
}
