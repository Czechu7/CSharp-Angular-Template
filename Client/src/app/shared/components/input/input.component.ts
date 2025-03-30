import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  type ControlValueAccessor,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { IInputProps, IInputTypes, IInputIcons } from '../../types/input.types';
import { IAutocompletePersonalInfo } from '../../types/auto-complete.types';

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
export class InputComponent<T> implements ControlValueAccessor, IInputProps {
  @Input() label?: string;
  @Input() placeholder?: string = '';
  @Input() type: IInputTypes = 'text';
  @Input() required = false;
  @Input() errorMessage?: string;
  @Input() invalid?: boolean;
  @Input() prefixIcon?: IInputIcons;
  @Input() prefixText?: string;
  @Input() suffixIcon?: IInputIcons;
  @Input() suffixText?: string;
  @Input() formControl!: FormControl;
  @Input() autocomplete!: IAutocompletePersonalInfo;

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
