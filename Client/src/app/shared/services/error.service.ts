import { inject, Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private translateService = inject(TranslateService);

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
