import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  AdminProfileForm,
  ExampleCrudForm,
  LoginForm,
  PasswdRecoveryForm,
  PasswordsForm,
  RegisterForm,
  ThemeForm,
} from '../models/form.model';
import { initLoginForm } from './forms/initLoginForm';
import { initPasswdRecoveryForm } from './forms/initPasswdRecoveryForm';
import { initPasswordsForm } from './forms/initPasswordsForm';
import { initRegisterForm } from './forms/initRegisterForm';
import { initThemeForm } from './forms/initThemeForm';
import { initExampleCrudForm } from './forms/initExampleCrudForm';
import { initAdminProfileForm } from './forms/initAdminProfileForm';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  public getPasswordsForm(): FormGroup<PasswordsForm> {
    return initPasswordsForm();
  }

  public getLoginForm(): FormGroup<LoginForm> {
    return initLoginForm();
  }

  public getRegisterForm(): FormGroup<RegisterForm> {
    return initRegisterForm();
  }

  public getAdminProfileForm(): FormGroup<AdminProfileForm> {
    return initAdminProfileForm();
  }

  public getThemeForm(): FormGroup<ThemeForm> {
    return initThemeForm();
  }

  public getPasswdRecoveryForm(): FormGroup<PasswdRecoveryForm> {
    return initPasswdRecoveryForm();
  }

  public getExampleCrudForm(): FormGroup<ExampleCrudForm> {
    return initExampleCrudForm();
  }
}
