import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminProfileForm } from '../../models/form.model';
import { VALIDATION_LENGTHS } from '../../../config/validations.config';

export const initAdminProfileForm = (): FormGroup<AdminProfileForm> => {
  return new FormGroup({
    userName: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    firstName: new FormControl('', {
      validators: [],
      nonNullable: true,
    }),
    lastName: new FormControl('', {
      validators: [],
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
    roles: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    isActive: new FormControl(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
};
