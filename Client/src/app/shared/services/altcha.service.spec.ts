import { TestBed } from '@angular/core/testing';

import { AltchaService } from './altcha.service';

describe('AltchaService', () => {
  let service: AltchaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AltchaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
