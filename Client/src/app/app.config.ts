import { ɵBrowserAnimationBuilder } from '@angular/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';
import { routes } from './app.routes';
import { authInterceptor } from './core/_interceptors/auth.interceptor';
import { refreshTokenInterceptor } from './core/_interceptors/refresh-token.interceptor';
import { providePrimeNG } from 'primeng/config';
import { errorInterceptor } from './core/_interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor, refreshTokenInterceptor, errorInterceptor])
    ),
    provideAnimationsAsync(),
    ɵBrowserAnimationBuilder,
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
    MessageService,
  ],
};
