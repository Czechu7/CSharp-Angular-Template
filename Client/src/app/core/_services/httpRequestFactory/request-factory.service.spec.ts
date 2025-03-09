import { TestBed } from '@angular/core/testing';

import { RequestFactoryService } from './request-factory.service';

describe('RequestFactoryService', () => {
  let service: RequestFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestFactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
