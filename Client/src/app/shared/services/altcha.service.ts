import { inject, Injectable } from '@angular/core';
import { RequestFactoryService } from '../../core/_services/httpRequestFactory/request-factory.service';
import { IAltchaStatus } from '../models/altcha.model';

@Injectable({
  providedIn: 'root',
})
export class AltchaService {
  requestFactory = inject(RequestFactoryService);

  constructor() {}

  private altchaPayload: string | null = null;
  private altchaIsValid: boolean = false;

  public setPayload(payload: string): void {
    this.altchaPayload = payload;
  }

  public getPayload(): string | null {
    return this.altchaPayload;
  }

  public clearPayload(): void {
    this.altchaPayload = null;
  }

  public handleAltcha(state: IAltchaStatus): void {
    switch (state.state) {
      case 'verifying':
        console.log('Altcha is verifying!');
        break;
      case 'verified':
        console.log('Altcha is verified!', state.payload);
        this.setPayload(state.payload);
        break;
      case 'unverified':
        console.log('Altcha is unverified!');
        break;
      case 'error':
        console.log('Altcha has an error!', state.payload);
        break;
      default:
        console.log('Altcha state is unknown!');
        break;
    }
  }
}
