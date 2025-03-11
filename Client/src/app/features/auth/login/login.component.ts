import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '../../../shared/models/form.model';
import { FormService } from '../../../shared/services/form.service';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    CommonModule,
    PasswordInputComponent,
    RouterModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.loginForm = this.formService.initLoginForm();

    this.loginForm.valueChanges.subscribe(values => {
      console.log('Form values:', values);
    });

    this.loginForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
    });
  }

  get controls() {
    return this.loginForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onLogin() {
    console.log('Form submitted:', this.loginForm.getRawValue());
    console.log('Form valid:', this.loginForm.valid);
    console.log('Email valid:', this.controls.email.valid);
    console.log('Password valid:', this.controls.password.valid);
  }
}
