import { Component, inject, OnInit } from '@angular/core';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormService } from '../../shared/services/form.service';
import { AuthService } from '../../core/_services/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from '../../shared/services/error.service';
import { UserForm } from '../../shared/models/form.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { UserService } from '../../core/_services/user/user.service';


@Component({
  selector: 'app-user-panel',
  standalone: true,
  imports: [
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule,
    CommonModule,
    PasswordInputComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './user-panel.component.html',
  styleUrl: './user-panel.component.scss',
})
export class UserPanelComponent implements OnInit {
  userForm!: FormGroup<UserForm>;
  protected isLoading = false;
  protected userData: any = null;
  protected username: string = '';

  private formService = inject(FormService);
  private userService = inject(UserService);
  private errorService = inject(ErrorService);

  ngOnInit() {
    this.initForm();
    this.loadUserData();
  }

  private initForm() {
    this.userForm = this.formService.getUserForm();
  }

  get controls() {
    return this.userForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.errorService.getErrorMessage(control);
  }

  loadUserData() {
    this.controls.username.setValue('Y');
    this.isLoading = true;
    this.userService.getCurrentUserData().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.userData = response.data;
          this.username = this.userData.username;
          
          // Reset form and patch with new values
          this.userForm.reset();
          this.userForm.patchValue({
            username: this.userData.username,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            email: this.userData.email
          }, { emitEvent: false });
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onUpdate() {
    if (this.userForm.valid) {
      this.isLoading = true;
      this.userService.updateUserData(this.userForm.getRawValue()).subscribe({
        next: (res) => {
          if (res.success) {
            this.loadUserData(); 
          }
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }
}