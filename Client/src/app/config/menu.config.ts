import { RouterEnum } from './router.enum';

export const MenuConfig = {
  title: 'Angular Template',
  footerTitle: 'Karmelki',
  authMenuItems: [
    { label: 'Profile', routerLink: `/${RouterEnum.settings}` },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    { label: 'Logout', command: () => {} },
  ],
  nonAuthMenuItems: [
    { label: 'Login', routerLink: `/${RouterEnum.login}` },
    { label: 'Register', routerLink: `/${RouterEnum.register}` },
  ],
  langs: [
    { label: 'English', value: 'en' },
    { label: 'Polski', value: 'pl' },
  ],
};
