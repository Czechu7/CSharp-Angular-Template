import { FormControl } from '@angular/forms';

export interface PasswdRecoveryForm {
  email: FormControl<string>;
}

export interface PasswordsForm {
  password: FormControl<string>;
  repeatedPassword: FormControl<string>;
}

export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

export interface RegisterForm extends LoginForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  username: FormControl<string>;
  confirmPassword: FormControl<string>;
}

export interface ThemeForm {
  theme: FormControl<boolean>;
}
