import { TestBed } from '@angular/core/testing';

import { WorkloadPageService } from './workload-page.service';

describe('WorkloadPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkloadPageService = TestBed.get(WorkloadPageService);
    expect(service).toBeTruthy();
  });
});
