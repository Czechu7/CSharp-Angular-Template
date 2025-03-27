import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginForm } from '../../models/form.model';
import { VALIDATION_LENGTHS } from '../../../config/validations.config';

export const initLoginForm = (): FormGroup<LoginForm> => {
  return new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.minLength(VALIDATION_LENGTHS.MIN_EMAIL),
        Validators.maxLength(VALIDATION_LENGTHS.MAX_EMAIL),
      ],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(VALIDATION_LENGTHS.MIN_PASSWORD),
        Validators.maxLength(VALIDATION_LENGTHS.MAX_PASSWORD),
      ],
      nonNullable: true,
    }),
  });
};
