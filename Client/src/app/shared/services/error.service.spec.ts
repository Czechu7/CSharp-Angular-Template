import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

describe('ErrorService', () => {
  let service: ErrorService;
  let translateServiceMock: jasmine.SpyObj<TranslateService>;

  beforeEach(() => {
    translateServiceMock = jasmine.createSpyObj('TranslateService', ['instant']);

    TestBed.configureTestingModule({
      providers: [ErrorService, { provide: TranslateService, useValue: translateServiceMock }],
    });

    service = TestBed.inject(ErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return required error message', () => {
    const control = new FormControl(null, { validators: [Validators.required] });
    control.markAsTouched();
    translateServiceMock.instant.and.returnValue('This field is required');

    control.updateValueAndValidity();
    const errorMessage = service.getErrorMessage(control);

    expect(translateServiceMock.instant).toHaveBeenCalledWith('ERRORS.REQUIRED');
    expect(errorMessage).toBe('This field is required');
  });

  it('should return minlength error message', () => {
    const minLength = 3;
    const control = new FormControl('a', {
      validators: [Validators.minLength(minLength)],
    });
    translateServiceMock.instant.and.returnValue(`Minimum length is ${minLength}`);
    control.markAsTouched();

    control.updateValueAndValidity();
    const errorMessage = service.getErrorMessage(control);

    expect(translateServiceMock.instant).toHaveBeenCalledWith('ERRORS.MIN_LENGTH', { minLength });
    expect(errorMessage).toBe(`Minimum length is ${minLength}`);
  });

  it('should return maxlength error message', () => {
    const maxLength = 5;
    const control = new FormControl('too long text', {
      validators: [Validators.maxLength(maxLength)],
    });
    translateServiceMock.instant.and.returnValue(`Maximum length is ${maxLength}`);
    control.markAsTouched();

    control.updateValueAndValidity();
    const errorMessage = service.getErrorMessage(control);

    expect(translateServiceMock.instant).toHaveBeenCalledWith('ERRORS.MAX_LENGTH', { maxLength });
    expect(errorMessage).toBe(`Maximum length is ${maxLength}`);
  });

  it('should return email error message', () => {
    const control = new FormControl('invalid-email', {
      validators: [Validators.email],
    });
    translateServiceMock.instant.and.returnValue('Invalid email format');
    control.markAsTouched();

    control.updateValueAndValidity();
    const errorMessage = service.getErrorMessage(control);

    expect(translateServiceMock.instant).toHaveBeenCalledWith('ERRORS.INVALID_EMAIL');
    expect(errorMessage).toBe('Invalid email format');
  });

  it('should return passwords not equal error message', () => {
    const control = new FormControl('password1');
    control.setErrors({ passwordsNotEqual: true });
    translateServiceMock.instant.and.returnValue('Passwords do not match');

    const errorMessage = service.getErrorMessage(control);

    expect(translateServiceMock.instant).toHaveBeenCalledWith('ERRORS.PASSWORDS_NOT_EQUAL');
    expect(errorMessage).toBe('Passwords do not match');
  });

  it('should return empty string when no recognized error exists', () => {
    const control = new FormControl('valid value');

    const errorMessage = service.getErrorMessage(control);

    expect(errorMessage).toBe('');
  });
});
