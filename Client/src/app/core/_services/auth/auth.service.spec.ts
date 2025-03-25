import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthService } from './auth.service';
import { MessageService } from 'primeng/api';
import { TokenService } from '../token/token.service';

describe('AuthService', () => {
  let service: AuthService;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;

  beforeEach(() => {
    tokenServiceSpy = jasmine.createSpyObj('TokenService', [
      'setTokens',
      'getAccessToken',
      'getRefreshToken',
      'removeTokens',
      'validateRefreshToken',
      'decodeToken',
    ]);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MessageService, { provide: TokenService, useValue: tokenServiceSpy }],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isAuth', () => {
    it('should return true if valid access and refresh tokens are present', () => {
      tokenServiceSpy.getAccessToken.and.returnValue('access-token');
      tokenServiceSpy.getRefreshToken.and.returnValue({
        refreshToken: 'refresh-token',
        expiresAt: '2025-03-25T12:09:10.543Z',
      });
      tokenServiceSpy.validateRefreshToken.and.returnValue(true);

      expect(service.isAuth()).toBeTrue();
    });

    it('should return false if access or refresh tokens are missing or invalid', () => {
      tokenServiceSpy.getAccessToken.and.returnValue(null);
      tokenServiceSpy.getRefreshToken.and.returnValue(null);

      expect(service.isAuth()).toBeFalse();
    });
  });
});
