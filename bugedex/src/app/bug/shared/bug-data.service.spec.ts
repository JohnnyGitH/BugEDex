import { TestBed } from '@angular/core/testing';

import { BugDataService } from './bug-data.service';

describe('BugDataService', () => {
  let service: BugDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BugDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
