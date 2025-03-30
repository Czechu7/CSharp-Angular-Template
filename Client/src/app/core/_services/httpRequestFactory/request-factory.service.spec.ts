import { TestBed } from '@angular/core/testing';

import { RequestFactoryService } from './request-factory.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RequestFactoryService', () => {
  let service: RequestFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RequestFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
