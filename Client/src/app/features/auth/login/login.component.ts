import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '../../../shared/models/form.model';
import { FormService } from '../../../shared/services/form.service';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../core/_services/auth/auth.service';
import { RouterEnum } from '../../../enums/router.enum';
import { ILoginDto } from '../../../core/_models/DTOs/authDto.model';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginForm>;
  RouterEnum = RouterEnum;

  constructor(
    private formService: FormService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loginForm = this.formService.initLoginForm();
  }

  get controls() {
    return this.loginForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onLogin() {
    this.authService.signIn(this.loginForm.getRawValue() as ILoginDto).subscribe({
      next: res => {
        console.log('Login successful');
        console.log(res);
      },
      error: error => {
        console.error('Login failed');
        console.error(error);
      },
    });
  }
}
