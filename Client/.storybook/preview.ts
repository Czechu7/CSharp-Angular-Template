import { APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import { applicationConfig, Preview } from '@storybook/angular';
import docJson from '../documentation.json';

import Aura from '@primeng/themes/aura';
import { PrimeNG } from 'primeng/config';
setCompodocJson(docJson);

function provideTheme(config: PrimeNG) {
  return () => {
    config.theme.set({
      preset: Aura,
      options: {
        darkModeSelector: false,
      },
    });
  };
}

const preview: Preview = {
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        {
          provide: APP_INITIALIZER,
          useFactory: provideTheme,
          deps: [PrimeNG],
          multi: true,
        },
      ],
    }),
  ],
};

export default preview;
