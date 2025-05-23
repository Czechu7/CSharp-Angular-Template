import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserForm } from '../../models/form.model';
import { VALIDATION_LENGTHS } from '../../../config/validations.config';

export const initUserForm = (): FormGroup<UserForm> => {
  return new FormGroup(
    {
      userName: new FormControl('', {
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
          Validators.minLength(VALIDATION_LENGTHS.MIN_EMAIL),
          Validators.maxLength(VALIDATION_LENGTHS.MAX_EMAIL),
          Validators.email,
        ],
        nonNullable: true,
      }),
    }
  );
};