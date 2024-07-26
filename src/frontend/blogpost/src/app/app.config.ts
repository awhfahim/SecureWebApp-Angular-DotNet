import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha-2'
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { loadingInterceptor } from "./shared/interceptors/loading.interceptor";
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.RECAPTCHA_V3_SITE_KEY
    },
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        loadingInterceptor
      ])
    )
  ]
};
