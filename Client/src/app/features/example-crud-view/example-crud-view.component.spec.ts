import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleCrudViewComponent } from './example-crud-view.component';

describe('ExampleCrudViewComponent', () => {
  let component: ExampleCrudViewComponent;
  let fixture: ComponentFixture<ExampleCrudViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleCrudViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleCrudViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
