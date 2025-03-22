import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  ElementRef,
  Input,
  Output,
  ViewChild,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  Validator,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AltchaService } from '../../services/altcha.service';
import { IAltchaStatus } from '../../models/altcha.model';
import 'altcha';

@Component({
  selector: 'app-altcha',
  standalone: true,
  imports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './altcha.component.html',
  styleUrl: './altcha.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AltchaComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AltchaComponent),
      multi: true,
    },
  ],
})
export class AltchaComponent implements ControlValueAccessor, Validator {
  @ViewChild('altchaWidget', { static: true }) altchaWidget!: ElementRef;
  @Input() challengeurl = '';
  @Input() debug = false;
  @Input() test = false;
  @Input() value: string = '';
  @Input() style?: Record<string, string> = { '--altcha-max-width': '320px' };
  @Input() styleClass?: string;

  altchaService = inject(AltchaService);

  onChange = (status: IAltchaStatus): void => {
    this.altchaService.handleAltcha(status);
  };
  onTouched = (): void => {};

  ngAfterViewInit(): void {
    const el = this.altchaWidget.nativeElement as HTMLElement;
    el.addEventListener('statechange', ev => {
      const { detail } = ev as CustomEvent;
      if (detail) {
        const { payload, state } = detail;
        this.onStateChange(state, payload);
      }
    });
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.value) {
      return { required: true };
    }
    return null;
  }

  onStateChange(state: 'unverified' | 'verifying' | 'verified' | 'error', payload: string = '') {
    this.value = state === 'verified' ? payload : '';
    const statusObject: IAltchaStatus = { state, payload };
    this.onChange(statusObject);
    this.onTouched();
  }
}
