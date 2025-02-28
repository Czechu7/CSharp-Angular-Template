import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input() title: string = 'My Application';
  @Input() logo: string = 'assets/logo.png';
  @Input() menuItems: any[] = [];
  @Input() authMenuItems: any[] = [];
  @Input() nonAuthMenuItems: any[] = [];
  @Input() isAuthenticated: boolean = false;
  @Input() userName: string = '';
  @Input() userAvatar: string = '';

  combinedMenuItems: any[] = [];
  mobileMenuOpen: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateMenu();
  }

  ngOnChanges() {
    this.updateMenu();
  }

  updateMenu() {
    this.combinedMenuItems = [...this.menuItems];

    if (this.isAuthenticated) {
      this.combinedMenuItems = [
        ...this.combinedMenuItems,
        ...this.authMenuItems,
      ];
    } else {
      this.combinedMenuItems = [
        ...this.combinedMenuItems,
        ...this.nonAuthMenuItems,
      ];
    }

    this.combinedMenuItems = this.combinedMenuItems.filter(
      (item) => item.visible !== false
    );
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDropdown(item: any) {
    item.expanded = !item.expanded;
  }

  navigateTo(item: any) {
    if (item.routerLink) {
      this.router.navigate([item.routerLink]);
    } else if (item.url) {
      window.open(item.url, item.target || '_self');
    } else if (item.command) {
      item.command();
    }

    this.mobileMenuOpen = false;
  }

  logout() {
    this.isAuthenticated = false;
    this.updateMenu();
    this.router.navigate(['/login']);
  }
}
