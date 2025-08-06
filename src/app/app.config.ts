import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { jwtInterceptor } from './interceptors/jwt-interceptor';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),

    importProvidersFrom([
      JwtModule.forRoot({
        config: {
          tokenGetter: () => localStorage.getItem('jwt'),
          allowedDomains: ["localhost:8080"],
          disallowedRoutes: []
        }
      })
    ])
  ]
};
