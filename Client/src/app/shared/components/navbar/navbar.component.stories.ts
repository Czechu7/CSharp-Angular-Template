import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MenubarModule } from 'primeng/menubar';
import { of } from 'rxjs';
import { AuthService } from '../../../core/_services/auth/auth.service';
import { LanguageService } from '../../../core/_services/language/language.service';
import { RouterEnum } from '../../../enums/router.enum';
import { ThemeForm } from '../../models/form.model';
import { FormService } from '../../services/form.service';
import { IMenuItem } from '../../types/navbar.types';
import { ButtonComponent } from '../button/button.component';
import { ToggleSwitchComponent } from '../toggle-switch/toggle-switch.component';
import { NavbarComponent } from './navbar.component';

class MockTranslateService {
  get(key: string) {
    return of(key);
  }
  instant(key: string) {
    return key;
  }
  onLangChange = of({ lang: 'en' });
  getBrowserLang() {
    return 'en';
  }
}

class MockFormService {
  getThemeForm(): FormGroup<ThemeForm> {
    return new FormGroup({
      theme: new FormControl(false),
    }) as FormGroup<ThemeForm>;
  }
}

class MockLanguageService {
  languages = [
    { label: 'English', value: 'en' },
    { label: 'Polski', value: 'pl' },
  ];
  currentLang = 'en';
  currentLang$ = of('en');
}

class MockAuthService {
  isAuthenticated$ = of(false);
}

const meta: Meta<NavbarComponent> = {
  title: 'Components/Navbar',
  component: NavbarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MenubarModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        ButtonComponent,
        ToggleSwitchComponent,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: TranslateService, useClass: MockTranslateService },
        { provide: FormService, useClass: MockFormService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: AuthService, useClass: MockAuthService },
      ],
    }),
  ],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Navigation bar component with authentication, theming and language support',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text' },
    logo: { control: 'text' },
    menuItems: { control: 'object' },
    authMenuItems: { control: 'object' },
    nonAuthMenuItems: { control: 'object' },
    isAuthenticated: { control: 'boolean' },
    userName: { control: 'text' },
    userAvatar: { control: 'text' },
    showSwitchTheme: { control: 'boolean' },
    showSwitchLang: { control: 'boolean' },
    commonMenuItems: { control: 'object' },
    langs: { control: 'object' },
  },
};

export default meta;
type Story = StoryObj<NavbarComponent>;

const commonMenuItems: IMenuItem[] = [
  { label: 'Home', routerLink: RouterEnum.home },
  { label: 'About', routerLink: '/about' },
  { label: 'Contact', routerLink: '/contact' },
];

const authMenuItems: IMenuItem[] = [
  { label: 'Profile', routerLink: RouterEnum.settings },
  {
    label: 'Admin',
    items: [
      { label: 'Dashboard', routerLink: '/admin/dashboard' },
      { label: 'Users', routerLink: '/admin/users' },
      { label: 'Settings', routerLink: '/admin/settings' },
    ],
  },
];

const nonAuthMenuItems: IMenuItem[] = [
  { label: 'Login', routerLink: RouterEnum.login },
  { label: 'Register', routerLink: RouterEnum.register },
];

export const Default: Story = {
  args: {
    title: 'My Application',
    logo: 'https://primefaces.org/cdn/primeng/images/primeng.svg',
    menuItems: commonMenuItems,
    authMenuItems: authMenuItems,
    nonAuthMenuItems: nonAuthMenuItems,
    isAuthenticated: false,
    userName: '',
    userAvatar: '',
    showSwitchTheme: true,
    showSwitchLang: true,
    commonMenuItems: [],
    langs: [
      { label: 'English', value: 'en' },
      { label: 'Polski', value: 'pl' },
    ],
  },
};

export const Authenticated: Story = {
  args: {
    ...Default.args,
    isAuthenticated: true,
    userName: 'John Doe',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
};
