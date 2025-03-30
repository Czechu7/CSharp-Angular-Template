import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { FormControl } from '@angular/forms';

describe('InputComponent', () => {
  let component: InputComponent<string>;
  let fixture: ComponentFixture<InputComponent<string>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent<string>);
    component = fixture.componentInstance;
    component.formControl = new FormControl('');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
