import { Component, OnInit } from '@angular/core';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RegisterForm } from '../../../shared/models/form.model';
import { FormService } from '../../../shared/services/form.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';

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
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;

  constructor(private formService: FormService) {}

  ngOnInit() {
    this.registerForm = this.formService.initRegisterForm();

    this.registerForm.valueChanges.subscribe(values => {
      console.log('Form values:', values);
    });

    this.registerForm.statusChanges.subscribe(status => {
      console.log('Form status:', status);
    });

    this.registerForm.markAsPristine();
    this.registerForm.markAsUntouched();
  }

  get controls() {
    return this.registerForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onRegister() {
    console.log('Form submitted:', this.registerForm.getRawValue());
    console.log('Form valid:', this.registerForm.valid);
    console.log('Email valid:', this.controls.email.valid);
    console.log('Password valid:', this.controls.password.valid);
  }
}
