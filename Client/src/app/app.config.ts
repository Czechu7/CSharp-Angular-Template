import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { authInterceptor } from './core/_interceptors/auth.interceptor';
import { refreshTokenInterceptor } from './core/_interceptors/refresh-token.interceptor';
import { providePrimeNG } from 'primeng/config';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) =>
  new TranslateHttpLoader(http, 'localization/i18n/', '.json');
import { errorInterceptor } from './core/_interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([errorInterceptor, authInterceptor, refreshTokenInterceptor]),
    ),
    provideAnimationsAsync(),
    ɵBrowserAnimationBuilder,
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    MessageService,
    importProvidersFrom([
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
      }),
    ]),
  ],
};
