import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { formCanDeactivateGuard } from './form-can-deactivate.guard';

describe('formCanDeactivateGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      formCanDeactivateGuard(...guardParameters)
    );

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
