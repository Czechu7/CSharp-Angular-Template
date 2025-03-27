import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ThemeForm } from '../../models/form.model';

export const initThemeForm = (): FormGroup<ThemeForm> => {
  return new FormGroup({
    theme: new FormControl(false, {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
};
