import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordsForm } from '../../models/form.model';
import { equivalentValidator } from '../../validators/equivalent.validator';
import { VALIDATION_LENGTHS } from '../../../config/validations.config';

export const initPasswordsForm = (): FormGroup<PasswordsForm> => {
  return new FormGroup(
    {
      password: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(VALIDATION_LENGTHS.MIN_PASSWORD),
          Validators.maxLength(VALIDATION_LENGTHS.MAX_PASSWORD),
        ],
        nonNullable: true,
      }),
      repeatedPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(VALIDATION_LENGTHS.MIN_PASSWORD),
          Validators.maxLength(VALIDATION_LENGTHS.MAX_PASSWORD),
        ],
        nonNullable: true,
      }),
    },
    { validators: [equivalentValidator('password', 'repeatedPassword')] },
  );
};
