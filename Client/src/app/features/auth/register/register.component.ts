import { Component, OnInit } from '@angular/core';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RegisterForm } from '../../../shared/models/form.model';
import { FormService } from '../../../shared/services/form.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../core/_services/auth/auth.service';
import { RouterEnum } from '../../../config/router.enum';
import { RegisterModel } from '../../../core/_models/auth.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    CommonModule,
    PasswordInputComponent,
    RouterModule,
    FormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;
  RouterEnum = RouterEnum;

  constructor(
    private formService: FormService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.registerForm = this.formService.initRegisterForm();
  }

  get controls() {
    return this.registerForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onRegister() {
    this.authService.signUp(this.registerForm.getRawValue() as RegisterModel);
  }
}
