import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class KeycloakInitService {
  private keycloak!: Keycloak;

  init(): Promise<boolean> {
    this.keycloak = new Keycloak({
      url: 'http://localhost:8080', // URL do Keycloak
      realm: 'jambox',              // Nome do seu realm
      clientId: 'jambox-api'   // ID do seu client
    });

    return this.keycloak.init({
      onLoad: 'login-required',
      checkLoginIframe: false
    }).then(authenticated => {
      localStorage.setItem('token', this.keycloak.token!);
      return authenticated;
    });
  }

  getToken(): string | undefined {
    return this.keycloak?.token;
  }
}
