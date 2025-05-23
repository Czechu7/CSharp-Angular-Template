import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLogsListComponent } from './admin-logs-list.component';

describe('AdminLogsListComponent', () => {
  let component: AdminLogsListComponent;
  let fixture: ComponentFixture<AdminLogsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLogsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLogsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
