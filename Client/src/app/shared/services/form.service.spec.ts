import { TestBed } from '@angular/core/testing';

import { FormService } from './form.service';
import { TranslateModule } from '@ngx-translate/core';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
    });
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
