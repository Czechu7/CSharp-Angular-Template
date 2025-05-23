import { Component, inject, OnInit } from '@angular/core';
import { PasswordInputComponent } from '../../shared/components/password-input/password-input.component';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from '../../shared/components/input/input.component';
import { FormService } from '../../shared/services/form.service';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from '../../shared/services/error.service';
import { UserForm } from '../../shared/models/form.model';
import { ButtonComponent } from '../../shared/components/button/button.component';
import { UserService } from '../../core/_services/user/user.service';
import { IUser } from '../../core/_models/user.model';


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
  protected userData!: IUser;


  private formService = inject(FormService);
  private userService = inject(UserService);
  private errorService = inject(ErrorService);

  ngOnInit() {
    this.userForm = this.formService.getUserForm();
    this.loadUserData();
  }

  get controls() {
    return this.userForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.errorService.getErrorMessage(control);
  }

  loadUserData() {
    this.isLoading = true;
    this.userService.getCurrentUserData().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.userData = response.data;
          this.userForm.reset();
          this.userForm.patchValue({
            userName: this.userData.userName,
            firstName: this.userData.firstName,
            lastName: this.userData.lastName,
            email: this.userData.email
          });
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
      this.userService.updateUserData(this.userData.id, this.userForm.getRawValue()).subscribe({
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