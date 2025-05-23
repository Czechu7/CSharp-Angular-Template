import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../shared/services/form.service';
import { AdminProfileForm } from '../../../shared/models/form.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastService } from '../../../shared/services/toast.service';
import { ErrorService } from '../../../shared/services/error.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterEnum } from '../../../enums/router.enum';
import { AdminService } from '../../../core/_services/admin/admin.service';
import { IUserAdmin } from '../../../core/_models/user-admin.model';
import { RolesEnum } from '../../../enums/roles.enum';
import { Location } from '@angular/common';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-admin-users-edit',
  standalone: true,
  imports: [
    CommonModule,
    InputComponent,
    PasswordInputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    TranslateModule,
    SelectComponent,
    TooltipModule,
  ],
  templateUrl: './admin-users-edit.component.html',
  styleUrl: './admin-users-edit.component.scss',
})
export class AdminUsersEditComponent implements OnInit {
  readonly RouterEnum = RouterEnum;
  readonly rolesEnum = RolesEnum;

  adminProfileForm!: FormGroup<AdminProfileForm>;
  userData: IUserAdmin | undefined = undefined;
  userId: string | null = null;
  protected isLoading = false;

  editState = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    roles: false,
    isActive: false,
    userName: false,
  };

  private adminService = inject(AdminService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  private formService = inject(FormService);
  private errorService = inject(ErrorService);
  private toastService = inject(ToastService);
  private translateService = inject(TranslateService);

  ngOnInit(): void {
    this.adminProfileForm = this.formService.getAdminProfileForm();

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
    });

    this.getUserDetails();
  }

  get controls() {
    return this.adminProfileForm.controls;
  }

  get rolesList(): string[] {
    return Object.values(this.rolesEnum);
  }

  getErrorMessage(control: FormControl) {
    return this.errorService.getErrorMessage(control);
  }

  getUserDetails() {
    this.isLoading = true;
    if (!this.userId) return;

    this.adminService.getUserDetails(this.userId).subscribe({
      next: response => {
        this.userData = response.data;
        this.fillForm();
      },
      error: _ => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.fillForm();
      },
    });
  }

  toggleEditField(fieldName: keyof typeof this.editState): void {
    if (this.editState[fieldName]) {
      this.saveField(fieldName);
    } else {
      this.editState[fieldName] = true;
      this.controls[fieldName as keyof AdminProfileForm].enable();
    }
  }

  sendPasswordResetEmail() {
    this.isLoading = true;
    this.adminService.sendPasswordResetEmail().subscribe({
      next: _ => {
        console.log('Password reset email has been sent!');
      },
      error: _ => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
        this.toastService.showSuccess(
          this.translateService.instant('ADMIN.PROFILE_EDIT.TITLE'),
          this.translateService.instant('ADMIN.PROFILE_EDIT.SUCCESS_RESET_PASSWORD_MESSAGE'),
        );
      },
    });
  }

  onBack() {
    this.location.back();
  }

  private fillForm() {
    if (
      !this.userData ||
      !this.userData.userName ||
      !this.userData.firstName ||
      !this.userData.lastName ||
      !this.userData.email ||
      !this.userData.roles
    )
      return;

    this.controls.userName.setValue(this.userData.userName);
    this.controls.firstName.setValue(this.userData.firstName);
    this.controls.lastName.setValue(this.userData.lastName);
    this.controls.email.setValue(this.userData.email);
    this.controls.roles.setValue(this.userData.roles);
    this.controls.password.setValue('password');
    this.controls.userName.disable();
    this.controls.firstName.disable();
    this.controls.lastName.disable();
    this.controls.email.disable();
    this.controls.password.disable();
    this.controls.roles.disable();
  }

  private saveField(fieldName: keyof typeof this.editState): void {
    if (!this.userId) return;

    const fieldValue = this.controls[fieldName as keyof AdminProfileForm].value;

    this.controls[fieldName as keyof AdminProfileForm].disable();
    this.editState[fieldName] = false;
    this.isLoading = false;

    const updateData = { [fieldName]: fieldValue };

    this.adminService.updateUserProfile(updateData, this.userId).subscribe({
      next: _ => {},
      error: _ => {},
      complete: () => {
        this.isLoading = false;

        this.toastService.showSuccess(
          this.translateService.instant('ADMIN.PROFILE_EDIT.TITLE'),
          this.translateService.instant('ADMIN.PROFILE_EDIT.SUCCESS_MESSAGE'),
        );
      },
    });
  }
}
