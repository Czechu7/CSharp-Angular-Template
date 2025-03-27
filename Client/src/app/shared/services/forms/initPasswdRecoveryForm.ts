import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswdRecoveryForm } from '../../models/form.model';

export const initPasswdRecoveryForm = (): FormGroup<PasswdRecoveryForm> => {
  return new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
  });
};
