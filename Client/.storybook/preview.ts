import { APP_INITIALIZER } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { applicationConfig, Preview } from '@storybook/angular';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import docJson from '../documentation.json';

import { PrimeNG } from 'primeng/config';
import Nora from '@primeng/themes/nora';
setCompodocJson(docJson);

function provideTheme(config: PrimeNG) {
  return () => {
    config.theme.set({
      preset: Nora,
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
