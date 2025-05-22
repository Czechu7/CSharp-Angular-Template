import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, Output, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';

import { ISidebarItem } from '../../types/sidebar.types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    PanelMenuModule,
    ButtonModule,
    TooltipModule,
    AvatarModule,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnChanges {
  @Input() visible = false;
  @Input() position: 'left' | 'right' = 'left';
  @Input() title = '';
  @Input() logo?: string;
  @Input() menuItems: ISidebarItem[] = [];

  @Input() commonMenuItems: ISidebarItem[] = [];
  @Input() collapsed = false;

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() collapsedChange = new EventEmitter<boolean>();

  private router = inject(Router);

  primeMenuItems: MenuItem[] = [];

  ngOnChanges() {
    this.updateMenu();
  }

  updateMenu() {
    this.primeMenuItems = this.mapToPrimeMenuItems(this.menuItems);
  }

  mapToPrimeMenuItems(items: ISidebarItem[]): MenuItem[] {
    return items.map(item => {
      const menuItem: MenuItem = {
        label: item.label,
        icon: item.icon,
        disabled: item.disabled,
        visible: item.visible,
      };

      if (item.routerLink) {
        menuItem.command = event => {
          this.router.navigate([item.routerLink]);

          this.toggleSidebar();
        };
      } else if (item.url) {
        menuItem.command = event => {
          window.open(item.url, item.target || '_self');
          this.toggleSidebar();
        };
      } else if (item.command) {
        menuItem.command = event => {
          if (typeof item.command === 'function') {
            item.command();
          }
          this.toggleSidebar();
        };
      }

      if (item.items && item.items.length > 0) {
        menuItem.items = this.mapToPrimeMenuItems(item.items);
      }

      return menuItem;
    });
  }

  toggleSidebar() {
    this.visible = !this.visible;
    this.visibleChange.emit(this.visible);
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapsedChange.emit(this.collapsed);
  }
}
