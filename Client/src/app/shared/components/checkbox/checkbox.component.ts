import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { CheckboxProps } from '../../types/checkbox.types';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, CheckboxModule, FormsModule, ReactiveFormsModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    },
  ],
})
export class CheckboxComponent implements CheckboxProps, ControlValueAccessor {
  @Input() inputId?: string;
  @Input() name?: string;
  @Input() disabled = false;
  @Input() required = false;
  @Input() label?: string;
  @Input() formControlName?: string;
  @Input() value?: boolean;
  @Input() errorMessage?: string;
  @Input() invalid?: boolean;

  onChange: (value: boolean) => void = () => {};

  checked = false;
  touched = false;

  onTouched = () => {
    this.touched = true;
  };

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
