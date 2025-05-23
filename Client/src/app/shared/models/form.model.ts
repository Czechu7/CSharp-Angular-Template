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

export interface AdminProfileForm {
  userName: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  roles: FormControl<string>;
  isActive: FormControl<boolean>;
}

export interface ThemeForm {
  theme: FormControl<boolean>;
}

export interface ExampleCrudForm {
  id: FormControl<string>;
  name: FormControl<string>;
  count: FormControl<number>;
  price: FormControl<number>;
  isZiemniak: FormControl<boolean>;
  arrivalDate: FormControl<Date>;
}
