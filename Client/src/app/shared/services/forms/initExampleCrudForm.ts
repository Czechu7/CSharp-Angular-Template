import { FormControl, FormGroup, Validators } from '@angular/forms';
import { VALIDATION_LENGTHS } from '../../../config/validations.config';
import { ExampleCrudForm } from '../../models/form.model';

export const initExampleCrudForm = (): FormGroup<ExampleCrudForm> => {
  return new FormGroup({
    id: new FormControl('', {
      nonNullable: true,
    }),
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(VALIDATION_LENGTHS.MIN_NAME),
        Validators.maxLength(VALIDATION_LENGTHS.MAX_NAME),
      ],
      nonNullable: true,
    }),
    count: new FormControl(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    price: new FormControl(0, {
      validators: [Validators.required, Validators.min(0)],
      nonNullable: true,
    }),
    isZiemniak: new FormControl(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
    arrivalDate: new FormControl(new Date(), {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
};
