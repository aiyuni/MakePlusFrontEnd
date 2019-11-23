import { TestBed } from '@angular/core/testing';

import { BusinessCodeService } from './business-code.service';

describe('BusinessCodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessCodeService = TestBed.get(BusinessCodeService);
    expect(service).toBeTruthy();
  });
});
