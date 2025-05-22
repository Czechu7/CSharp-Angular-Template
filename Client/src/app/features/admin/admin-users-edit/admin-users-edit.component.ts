import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PasswordInputComponent } from '../../../shared/components/password-input/password-input.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../../../shared/services/form.service';
import { AdminProfileForm } from '../../../shared/models/form.model';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorService } from '../../../shared/services/error.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { RouterEnum } from '../../../enums/router.enum';
import { SelectComponent } from '../../../shared/components/select/select.component';

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
  ],
  templateUrl: './admin-users-edit.component.html',
  styleUrl: './admin-users-edit.component.scss',
})
export class AdminUsersEditComponent implements OnInit {
  adminProfileForm!: FormGroup<AdminProfileForm>;
  RouterEnum = RouterEnum;

  protected isLoading = false;

  public roles = [
    { id: 1, name: 'Admin' },
    { id: 2, name: 'User' },
    { id: 3, name: 'Guest' },
  ];

  public user = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'mail@mail.com',
    role: 'Admin',
  };

  private route = inject(ActivatedRoute);
  private formService = inject(FormService);
  private errorService = inject(ErrorService);

  userId: string | null = null;

  editState = {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    role: false,
  };

  ngOnInit(): void {
    this.adminProfileForm = this.formService.getAdminProfileForm();

    this.route.paramMap.subscribe(params => {
      this.userId = params.get('id');
      console.log('User ID:', this.userId);
    });

    this.fillForm();
  }

  fillForm() {
    this.controls.firstName.setValue(this.user.firstName);
    this.controls.lastName.setValue(this.user.lastName);
    this.controls.email.setValue(this.user.email);
    this.controls.password.setValue('password');
    this.controls.firstName.disable();
    this.controls.lastName.disable();
    this.controls.email.disable();
    this.controls.password.disable();
  }

  get controls() {
    return this.adminProfileForm.controls;
  }

  getErrorMessage(control: FormControl) {
    return this.errorService.getErrorMessage(control);
  }

  onSubmit() {
    console.log('Form submitted:', this.adminProfileForm);
  }

  toggleEditField(fieldName: keyof typeof this.editState): void {
    if (this.editState[fieldName]) {
      this.saveField(fieldName);
    } else {
      this.editState[fieldName] = true;
      this.controls[fieldName as keyof AdminProfileForm].enable();
    }
  }

  saveField(fieldName: keyof typeof this.editState): void {
    if (!this.userId) return;

    const fieldValue = this.controls[fieldName as keyof AdminProfileForm].value;

    this.controls[fieldName as keyof AdminProfileForm].disable();
    this.editState[fieldName] = false;
    this.isLoading = false;
    
    const updateData = { [fieldName]: fieldValue };
  }
}
