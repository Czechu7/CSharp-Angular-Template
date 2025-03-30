import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { IPasswordInputProps, IVariant } from '../../types/password-input.types';
import { IAutocompletePassword } from '../../types/auto-complete.types';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports: [PasswordModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
})
export class PasswordInputComponent<T> implements ControlValueAccessor, IPasswordInputProps {
  @Input() label?: string;
  @Input() placeholder?: string = '';
  @Input() required = false;
  @Input() invalid = false;
  @Input() errorMessage?: string;
  @Input() formControl!: FormControl;
  @Input() feedback?: boolean;
  @Input() promptLabel?: string;
  @Input() weakLabel?: string;
  @Input() mediumLabel?: string;
  @Input() strongLabel?: string;
  // @Input() size?: Size;
  @Input() variant: IVariant = 'outlined';
  @Input() autocomplete: IAutocompletePassword = 'new-password';

  id = `input-${Math.random().toString(36).substr(2, 9)}`;
  touched = false;
  value: T | null = null;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  private onChange = (_value: T) => {};
  onTouched = () => {
    this.touched = true;
  };

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(value: T): void {
    this.value = value;
    this.onChange(value);
  }
}
