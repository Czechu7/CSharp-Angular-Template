import { inject, Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import {
  PasswordsForm,
  LoginForm,
  RegisterForm,
  PasswdRecoveryForm,
  ThemeForm,
} from '../models/form.model';
import { equivalentValidator } from '../validators/equivalent.validator';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  translateService = inject(TranslateService);

  initPasswordsForm(): FormGroup<PasswordsForm> {
    return new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8), Validators.maxLength(75)],
          nonNullable: true,
        }),
        repeatedPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(8), Validators.maxLength(75)],
          nonNullable: true,
        }),
      },
      { validators: [equivalentValidator('password', 'repeatedPassword')] }
    );
  }

  initLoginForm(): FormGroup<LoginForm> {
    return new FormGroup({
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(75)],
        nonNullable: true,
      }),
    });
  }

  initRegisterForm(): FormGroup<RegisterForm> {
    return new FormGroup({
      username: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        nonNullable: true,
      }),
      firstName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        nonNullable: true,
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
        nonNullable: true,
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(75)],
        nonNullable: true,
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(8), Validators.maxLength(75)],
        nonNullable: true,
      }),
    });
  }

  initThemeForm(): FormGroup<ThemeForm> {
    return new FormGroup({
      theme: new FormControl(false, {
        validators: [Validators.required],
        nonNullable: true,
      }),
    });
  }

  initPasswdRecoveryForm(): FormGroup<PasswdRecoveryForm> {
    return new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
        nonNullable: true,
      }),
    });
  }

  getErrorMessage(control: FormControl): string {
    if (control.hasError('required')) {
      return this.translateService.instant('ERRORS.REQUIRED');
    }

    if (
      control.hasError('pattern') &&
      control.errors?.['pattern']?.['requiredPattern'] === '/^\\d{2}-\\d{3}$/'
    ) {
      return this.translateService.instant('ERRORS.POSTAL_CODE_FORMAT');
    }

    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return this.translateService.instant('ERRORS.MIN_LENGTH', { minLength });
    }

    if (control.hasError('maxlength')) {
      const maxLength = control.errors?.['maxlength']?.requiredLength;
      return this.translateService.instant('ERRORS.MAX_LENGTH', { maxLength });
    }

    if (control.hasError('email')) {
      return this.translateService.instant('ERRORS.INVALID_EMAIL');
    }

    if (control.hasError('passwordsNotEqual')) {
      return this.translateService.instant('ERRORS.PASSWORDS_NOT_EQUAL');
    }

    return '';
  }
}
