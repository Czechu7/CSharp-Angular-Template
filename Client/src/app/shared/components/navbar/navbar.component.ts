import { CommonModule } from '@angular/common';
import { Component, inject, Input, type OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import type { ILangs, IMenuItem, INavbarProps } from '../../types/navbar.types';
import { ButtonComponent } from '../button/button.component';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { ThemeForm } from '../../models/form.model';
import { FormService } from '../../services/form.service';
import { LanguageService } from '../../../core/_services/language/language.service';
import { TranslateModule } from '@ngx-translate/core';
import { ILanguage } from '../../../core/_models/language.model';
import { RouterEnum } from '../../../enums/router.enum';
import { AuthService } from '../../../core/_services/auth/auth.service';
import { HasRoleDirective } from '../../directives/has-role.directive';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    CommonModule,
    ButtonComponent,
    ToggleSwitchComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    HasRoleDirective,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, INavbarProps {
  @Input() title = 'My Application';
  @Input() logo?: string;
  @Input() menuItems: IMenuItem[] = [];
  @Input() authMenuItems: IMenuItem[] = [];
  @Input() nonAuthMenuItems: IMenuItem[] = [];
  @Input() isAuthenticated = false;
  @Input() userName = '';
  @Input() userAvatar = '';
  @Input() showSwitchTheme = false;
  @Input() showSwitchLang = false;
  @Input() commonMenuItems: IMenuItem[] = [];
  @Input() langs: ILangs = [];

  combinedMenuItems: IMenuItem[] = [];
  mobileMenuOpen = false;
  isDarkTheme = false;
  languages: ILanguage[] = [];
  currentLang!: string;
  themeForm!: FormGroup<ThemeForm>;
  RouterEnum = RouterEnum;

  private router = inject(Router);
  private formService = inject(FormService);
  private languageService = inject(LanguageService);
  private authService = inject(AuthService);

  get controls() {
    return this.themeForm.controls;
  }

  ngOnInit() {
    this.languages = this.languageService.languages;

    this.currentLang = this.languageService.currentLang;

    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
      this.updateMenu();
    });
    this.updateMenu();
    this.checkCurrentTheme();

    this.themeForm = this.formService.getThemeForm();
    this.controls.theme.setValue(this.isDarkTheme);

    this.controls.theme.valueChanges.subscribe(isDark => {
      if (isDark !== this.isDarkTheme) {
        this.isDarkTheme = isDark;
        this.toggleTheme();
      }
    });
  }

  ngOnChanges() {
    this.updateMenu();
  }

  updateMenu() {
    this.combinedMenuItems = [...this.menuItems];

    if (this.isAuthenticated) {
      this.combinedMenuItems = [...this.combinedMenuItems, ...this.authMenuItems];
    } else {
      this.combinedMenuItems = [...this.combinedMenuItems, ...this.nonAuthMenuItems];
    }

    this.combinedMenuItems = this.combinedMenuItems.filter(item => item.visible !== false);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  toggleDropdown(item: IMenuItem) {
    item.expanded = !item.expanded;
  }

  navigateTo(item: IMenuItem) {
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
    this.authService.signOut();
    this.updateMenu();
  }

  toggleTheme() {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
  }

  checkCurrentTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
    } else if (savedTheme === 'light') {
      this.isDarkTheme = false;
      document.body.classList.remove('dark-theme');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.isDarkTheme = prefersDark;
      if (prefersDark) document.body.classList.add('dark-theme');
    }
  }

  switchLanguage(langValue: string) {
    this.languageService.changeLanguage(langValue);
  }
}
