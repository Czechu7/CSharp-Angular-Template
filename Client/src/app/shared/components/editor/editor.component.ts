import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { Editor } from 'primeng/editor';
import { IEditorProps, ITextChangeEvent } from '../../types/editor.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, Editor, CommonModule],
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EditorComponent),
      multi: true,
    },
  ],
})
export class EditorComponent implements ControlValueAccessor, IEditorProps {
  @Input() formControl!: FormControl;
  @Input() style?: Record<string, string> = { height: '320px' };
  @Input() styleClass?: string;
  @Input() placeholder?: string;
  @Input() formats?: string[];
  @Input() modules?: Record<string, unknown>;
  @Input() readOnly = false;

  value = '';
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: string) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
    this.formControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  onTextChange(event: ITextChangeEvent): void {
    this.value = event.htmlValue || '';
    this.onChange(this.value);
    this.onTouch();
  }
}
