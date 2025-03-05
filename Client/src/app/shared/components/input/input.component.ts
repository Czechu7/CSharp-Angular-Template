import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  type ControlValueAccessor,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputProps, InputTypes, InputIcons } from '../../types/input.types';

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
    ReactiveFormsModule,
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
  @Input() invalid?: boolean;
  @Input() prefixIcon?: InputIcons;
  @Input() prefixText?: string;
  @Input() suffixIcon?: InputIcons;
  @Input() suffixText?: string;
  @Input() formControlName?: string;
  @Input() autocomplete?: string;

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
