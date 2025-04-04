import { TestBed } from '@angular/core/testing';

import { FileService } from './file.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FileServiceService', () => {
  let service: FileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
