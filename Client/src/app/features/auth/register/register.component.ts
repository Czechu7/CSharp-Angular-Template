import { Component, inject, OnInit } from '@angular/core';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputComponent } from '../../../shared/components/input/input.component';
import { RegisterForm } from '../../../shared/models/form.model';
import { FormService } from '../../../shared/services/form.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { AuthService } from '../../../core/_services/auth/auth.service';
import { RouterEnum } from '../../../enums/router.enum';
import { IRegisterDto } from '../../../core/_models/DTOs/authDto.model';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from '../../../shared/services/error.service';

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
    TranslateModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup<RegisterForm>;
  RouterEnum = RouterEnum;

  private formService = inject(FormService);
  private authService = inject(AuthService);
  private errorService = inject(ErrorService);

  ngOnInit() {
    this.registerForm = this.formService.getRegisterForm();
  }

  get controls() {
    return this.registerForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.errorService.getErrorMessage(control);
  }

  onRegister() {
    this.authService.signUp(this.registerForm.getRawValue() as IRegisterDto).subscribe({
      next: res => {
        console.log('Register successful');
        console.log(res);
      },
      error: error => {
        console.error('Register failed');
        console.error(error);
      },
    });
  }
}
