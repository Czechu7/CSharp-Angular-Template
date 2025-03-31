import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ICheckboxProps } from '../../types/checkbox.types';

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
export class CheckboxComponent implements ICheckboxProps, ControlValueAccessor {
  @Input() inputId?: string;
  @Input() name?: string;
  @Input() required = false;
  @Input() label?: string;
  @Input() formControl!: FormControl;
  @Input() value?: boolean;
  @Input() errorMessage?: string;
  @Input() invalid?: boolean;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouchedFn: () => void = () => {};

  checked = false;
  touched = false;

  writeValue(value: boolean): void {
    this.checked = value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedFn = fn;
  }

  onTouched(): void {
    this.touched = true;
    this.onTouchedFn();
  }
}
