import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { KeycloakInitService } from './app/keycloak-init.service';

const keycloakService = new KeycloakInitService();


keycloakService.init().then(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .then(() => {
      const currentUrl = window.location.pathname;
      if (currentUrl === '/' || currentUrl === '/index.html') {
        window.location.href = '/dashboard';
      }
    });
});
