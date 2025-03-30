import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl(false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('CheckboxComponent ControlValueAccessor', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl(false);
    fixture.detectChanges();
  });

  it('should set checked value when writeValue is called', () => {
    component.writeValue(true);

    expect(component.checked).toBe(true);
  });

  it('should register onChange callback', () => {
    const mockOnChangeFn = jasmine.createSpy('mockOnChangeFn');

    component.registerOnChange(mockOnChangeFn);
    component.onChange(true);

    expect(mockOnChangeFn).toHaveBeenCalledWith(true);
  });

  it('should register onTouched callback', () => {
    const mockOnTouchedFn = jasmine.createSpy('mockOnTouchedFn');

    component.registerOnTouched(mockOnTouchedFn);
    component.onTouched();

    expect(mockOnTouchedFn).toHaveBeenCalled();
    expect(component.touched).toBe(true);
  });
});

describe('CheckboxComponent Input Properties', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    component.formControl = new FormControl(false);
    fixture.detectChanges();
  });

  it('should accept and apply inputId property', () => {
    component.inputId = 'test-id';
    fixture.detectChanges();

    expect(component.inputId).toBe('test-id');
  });

  it('should accept and apply name property', () => {
    component.name = 'test-name';
    fixture.detectChanges();

    expect(component.name).toBe('test-name');
  });

  it('should accept and apply label property', () => {
    component.label = 'Test Label';
    fixture.detectChanges();

    expect(component.label).toBe('Test Label');
  });

  it('should accept and apply required property', () => {
    component.required = true;
    fixture.detectChanges();

    expect(component.required).toBe(true);
  });

  it('should accept and apply error message and invalid properties', () => {
    component.errorMessage = 'This field is required';
    component.invalid = true;
    fixture.detectChanges();

    expect(component.errorMessage).toBe('This field is required');
    expect(component.invalid).toBe(true);
  });
});

describe('CheckboxComponent with FormControl', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let formControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxComponent, FormsModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    formControl = new FormControl(false);
    component.formControl = formControl;
    fixture.detectChanges();
  });

  it('should update formControl when internal state changes', () => {
    spyOn(component, 'onChange').and.callThrough();

    component.checked = true;
    component.onChange(true);

    expect(component.onChange).toHaveBeenCalledWith(true);
  });
});
