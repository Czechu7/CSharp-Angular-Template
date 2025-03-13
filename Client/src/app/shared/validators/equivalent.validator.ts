import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const equivalentValidator = (
  passwdControlName: string,
  secondPasswdControlName: string
): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const passwdControl = control.get(passwdControlName);
    const secondPasswdControl = control.get(secondPasswdControlName);

    if (
      secondPasswdControl?.value &&
      secondPasswdControl?.value !== passwdControl?.value
    ) {
      secondPasswdControl.setErrors({
        passwordsNotEqual: true,
      });
    }

    return null;
  };
};
