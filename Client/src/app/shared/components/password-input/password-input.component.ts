import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import {
  PasswordInputProps,
  Size,
  Variant,
} from '../../types/password-input.types';
import { CommonModule } from '@angular/common';

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
export class PasswordInputComponent<T>
  implements ControlValueAccessor, PasswordInputProps
{
  @Input() label?: string;
  @Input() placeholder?: string = '';
  @Input() disabled = false;
  @Input() required = false;
  @Input() invalid = false;
  @Input() errorMessage?: string;
  @Input() formControlName?: string;
  @Input() feedback?: boolean;
  @Input() promptLabel?: string;
  @Input() weakLabel?: string;
  @Input() mediumLabel?: string;
  @Input() strongLabel?: string;
  @Input() size?: Size;
  @Input() variant: Variant = 'outlined';

  id = `input-${Math.random().toString(36).substr(2, 9)}`;
  touched = false;
  value: T | null = null;

  private onChange = (value: T) => {};
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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(value: T): void {
    this.value = value;
    this.onChange(value);
  }
}
