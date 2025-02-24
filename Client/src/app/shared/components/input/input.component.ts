import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  type ControlValueAccessor,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

export type InputTypes =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'tel'
  | 'url';

export type InputIcons =
  | 'user'
  | 'map'
  | 'clock'
  | 'star'
  | 'check'
  | 'times'
  | 'shopping-cart';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: InputTypes;
  disabled?: boolean;
  required?: boolean;
  errorMessage?: string;
  prefixIcon?: InputIcons;
  prefixText?: string;
  suffixIcon?: InputIcons;
  suffixText?: string;
}

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
  ],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent<T> implements ControlValueAccessor, InputProps {
  @Input() label?: string;
  @Input() placeholder?: string = '';
  @Input() type: InputTypes = 'text';
  @Input() disabled = false;
  @Input() required = false;
  @Input() errorMessage?: string;
  @Input() prefixIcon?: InputIcons;
  @Input() prefixText?: string;
  @Input() suffixIcon?: InputIcons;
  @Input() suffixText?: string;

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
