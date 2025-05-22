import { Component } from '@angular/core';
import { SidebarComponent } from '../../../shared/components/sidebar/sidebar.component';
import { ISidebarItem } from '../../../shared/types/sidebar.types';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
  sidebarVisible = false;
  sidebarCollapsed = false;

  menuItems: ISidebarItem[] = [
    {
      label: 'User Management',
      icon: 'pi pi-users',
      items: [
        {
          label: 'Manage Users',
          routerLink: '/admin/users',
          icon: 'pi pi-user-edit',
        },
        {
          label: 'Privileges',
          routerLink: '/admin/users',
          icon: 'pi pi-shield',
        },
      ],
    },
    {
      label: 'Logs',
      icon: 'pi pi-list',
      routerLink: '/admin/logs',
    },
    {
      label: 'Analytics',
      icon: 'pi pi-chart-bar',
      routerLink: '/admin/logs',
    },
  ];
}
