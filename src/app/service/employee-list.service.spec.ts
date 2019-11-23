import { TestBed } from '@angular/core/testing';

import { EmployeeListService } from './employee-list.service';

describe('EmployeeListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeListService = TestBed.get(EmployeeListService);
    expect(service).toBeTruthy();
  });
});
