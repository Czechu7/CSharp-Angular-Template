import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { IToggleSwitchProps } from '../../types/toogleSwitch.types';

@Component({
  selector: 'app-toggle-switch',
  standalone: true,
  imports: [ToggleSwitchModule, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleSwitchComponent),
      multi: true,
    },
  ],
})
export class ToggleSwitchComponent implements ControlValueAccessor, IToggleSwitchProps {
  @Input() iconOn = 'pi-check';
  @Input() iconOff = 'pi-times';
  @Input() invalid = false;
  @Input() label?: string;
  @Input() labelPosition = 'right';
  @Input() styleClass?: string;
  @Input() errorMessage?: string;
  @Input() required?: boolean;
  @Input() formControl!: FormControl;

  @Output() valueChange = new EventEmitter<boolean>();

  id = `toggle-switch-${Math.random().toString(36).substr(2, 9)}`;

  private _value = false;
  touched = false;

  @Input()
  get value(): boolean {
    return this._value;
  }

  set value(val: boolean) {
    if (this._value !== val) {
      this._value = val;
      this.onChange(val);
      this.valueChange.emit(val);
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: boolean) => void = () => {};
  onTouched = () => {
    this.touched = true;
  };

  writeValue(value: boolean): void {
    this._value = value !== null && value !== undefined ? value : false;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInput(event: boolean): void {
    this.value = event;
    this.onTouched();
  }
}
