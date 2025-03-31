import { TestBed } from '@angular/core/testing';

import { ExampleCrudService } from './example-crud.service';

describe('ExampleCrudService', () => {
  let service: ExampleCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExampleCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
