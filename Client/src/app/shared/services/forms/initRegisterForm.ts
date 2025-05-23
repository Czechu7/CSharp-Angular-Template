import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterForm } from '../../models/form.model';
import { equivalentValidator } from '../../validators/equivalent.validator';
import { VALIDATION_LENGTHS } from '../../../config/validations.config';

export const initRegisterForm = (): FormGroup<RegisterForm> => {
  return new FormGroup(
    {
      username: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(VALIDATION_LENGTHS.MIN_USERNAME),
          Validators.maxLength(VALIDATION_LENGTHS.MAX_USERNAME),
        ],
        nonNullable: true,
      }),
      firstName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(VALIDATION_LENGTHS.MIN_USERNAME),
          Validators.maxLength(VALIDATION_LENGTHS.MAX_USERNAME),
        ],
        nonNullable: true,
      }),
      lastName: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(VALIDATION_LENGTHS.MIN_USERNAME),
          Validators.maxLength(VALIDATION_LENGTHS.MAX_USERNAME),
        ],
        nonNullable: true,
      }),
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
      confirmPassword: new FormControl('', {
        validators: [
          Validators.required,
          Validators.minLength(VALIDATION_LENGTHS.MIN_PASSWORD),
          Validators.maxLength(VALIDATION_LENGTHS.MAX_PASSWORD),
        ],
        nonNullable: true,
      }),
    },
    { validators: [equivalentValidator('password', 'confirmPassword')] },
  );
};
