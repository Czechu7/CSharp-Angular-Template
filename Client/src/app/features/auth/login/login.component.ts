import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginForm } from '../../../shared/models/form.model';
import { FormService } from '../../../shared/services/form.service';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/_services/auth/auth.service';
import { RouterEnum } from '../../../enums/router.enum';
import { ILoginDto } from '../../../core/_models/DTOs/authDto.model';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from '../../../shared/services/error.service';

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

  protected isLoading = false;

  private formService = inject(FormService);
  private authService = inject(AuthService);
  private errorService = inject(ErrorService);
  private router = inject(Router);

  ngOnInit() {
    this.loginForm = this.formService.getLoginForm();
  }

  get controls() {
    return this.loginForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.errorService.getErrorMessage(control);
  }

  onLogin() {
    this.isLoading = true;
    this.authService.signIn(this.loginForm.getRawValue() as ILoginDto).subscribe({
      next: res => {
        if (res.success) {
          this.router.navigate([RouterEnum.home]);
          this.loginForm.reset();
        } else {
          this.isLoading = false;
        }
      },
      error: _ => {
        this.isLoading = false;
      },
    });
  }
}
