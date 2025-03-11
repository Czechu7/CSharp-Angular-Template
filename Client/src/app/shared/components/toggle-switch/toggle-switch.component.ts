import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToggleSwitchProps } from '../../types/toogleSwitch.types';

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
export class ToggleSwitchComponent implements ToggleSwitchProps {
  @Input() disabled = false;
  @Input() iconOn?: string = 'pi-check';
  @Input() iconOff?: string = 'pi-times';
  @Input() invalid = false;
  @Input() label?: string;
  @Input() labelPosition = 'right';
  @Input() styleClass?: string;
  @Input() errorMessage?: string;
  @Input() required?: boolean;
  @Input() formControl!: FormControl;

  id = `input-${Math.random().toString(36).substr(2, 9)}`;

  private _value = false;
  touched = false;

  @Input()
  get value(): boolean {
    return this._value;
  }
  set value(val: boolean) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  onChange: (value: boolean) => void = () => {};
  onTouched = () => {
    this.touched = true;
  };

  writeValue(value: boolean): void {
    this._value = value;
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

  onInput(value: boolean): void {
    this.value = value;
  }
}
