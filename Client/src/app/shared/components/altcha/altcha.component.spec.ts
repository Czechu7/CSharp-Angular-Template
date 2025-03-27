import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltchaComponent } from './altcha.component';

describe('AltchaComponent', () => {
  let component: AltchaComponent;
  let fixture: ComponentFixture<AltchaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AltchaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltchaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
