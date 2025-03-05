import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { FloatLabelModule } from 'primeng/floatlabel';
import { SelectProps, Size, Variant, LabelVariant } from '../../types/select.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [SelectModule, ReactiveFormsModule, FormsModule, FloatLabelModule, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent<T = any> implements SelectProps<T>, ControlValueAccessor {
  @Input() formControlName = '';
  @Input() options?: T[];
  @Input() optionLabel?: string;
  @Input() optionValue?: string;
  @Input() placeholder?: string;
  @Input() disabled = false;
  @Input() filter?: boolean;
  @Input() checkmark = false;
  @Input() editable = false;
  @Input() filterBy?: string;
  @Input() loading = false;
  @Input() showClear = false;
  @Input() virtualScroll?: boolean;
  @Input() virtualScrollItemSize?: number;
  @Input() variant: Variant = 'filled';
  @Input() size?: Size;
  @Input() required?: boolean;
  @Input() label?: string;
  @Input() labelVariant: LabelVariant = 'over';
  @Input() inputId?: string;
  @Input() errorMessage?: string;
  @Input() invalid?: boolean;
  @Input() set value(val: T | null) {
    if (val !== this._value) {
      this._value = val === null ? undefined : val;
      this.onChangeCallback(val);
      this.onTouchCallback();
      this.valueChange.emit(val === null ? undefined : val);
    }
  }

  @Output() valueChange = new EventEmitter<T>();
  @Output() onSelect = new EventEmitter<{ originalEvent: Event; value: T }>();
  @Output() onChangeEvent = new EventEmitter<{
    originalEvent: Event;
    value: T;
  }>();

  id = `input-${Math.random().toString(36).substr(2, 9)}`;

  _value: T | undefined = undefined;

  get value(): T | undefined {
    return this._value;
  }

  touched = false;

  onTouched = () => {
    this.touched = true;
  };

  private onChangeCallback: (value: T | null) => void = () => {};
  private onTouchCallback: () => void = () => {};

  writeValue(value: T): void {
    if (value !== this._value) {
      this._value = value;
    }
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleSelect(event: { originalEvent: Event; value: T }): void {
    this.onSelect.emit(event);
  }

  handleChange(event: { originalEvent: Event; value: T }): void {
    this.onChangeCallback(event.value);
    this.onTouchCallback();
    this.valueChange.emit(event.value);
    this.onChangeEvent.emit(event);
  }
}
