import { LanguageCode } from '../enums/LanguageCode.enum';
import { RouterEnum } from '../enums/router.enum';

export const MenuConfig = {
  title: 'MENU.TITLE',
  footerTitle: 'MENU.FOOTER_TITLE',
  authMenuItems: [{ label: 'MENU.PROFILE', routerLink: `/${RouterEnum.userPanel}` }],
  nonAuthMenuItems: [
    { label: 'MENU.LOGIN', routerLink: `/${RouterEnum.login}` },
    { label: 'MENU.REGISTER', routerLink: `/${RouterEnum.register}` },
  ],
  langs: [
    { label: 'English', value: LanguageCode.ENGLISH },
    { label: 'Polski', value: LanguageCode.POLISH },
  ],
};
