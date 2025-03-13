import { CommonModule } from '@angular/common';
import { Component, Input, type OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import type { Langs, MenuItem, NavbarProps } from '../../types/navbar.types';
import { ButtonComponent } from '../button/button.component';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { ThemeForm } from '../../models/form.model';
import { FormService } from '../../services/form.service';
import { Language, LanguageService } from '../../../core/_services/language/language.service';

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
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit, NavbarProps {
  @Input() title = 'My Application';
  @Input() logo?: string;
  @Input() menuItems: MenuItem[] = [];
  @Input() authMenuItems: MenuItem[] = [];
  @Input() nonAuthMenuItems: MenuItem[] = [];
  @Input() isAuthenticated = false;
  @Input() userName = '';
  @Input() userAvatar = '';
  @Input() showSwitchTheme = false;
  @Input() showSwtichLang = false;
  @Input() commonMenuItems: MenuItem[] = [];
  @Input() langs: Langs = [];

  combinedMenuItems: MenuItem[] = [];
  mobileMenuOpen = false;
  isDarkTheme = false;
  languages: Language[] = [];
  currentLang = 'pl';
  themeForm!: FormGroup<ThemeForm>;

  constructor(
    private router: Router,
    private formService: FormService,
    private languageService: LanguageService
  ) {}

  get controls() {
    return this.themeForm.controls;
  }

  ngOnInit() {
    this.languages = this.languageService.languages;

    this.languageService.currentLang$.subscribe(lang => {
      this.currentLang = lang;
    });

    this.updateMenu();
    if (this.langs.length > 0) {
      this.currentLang = this.langs[0].value;
    }
    this.checkCurrentTheme();

    this.themeForm = this.formService.initThemeForm();

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

  toggleDropdown(item: MenuItem) {
    item.expanded = !item.expanded;
  }

  navigateTo(item: MenuItem) {
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
