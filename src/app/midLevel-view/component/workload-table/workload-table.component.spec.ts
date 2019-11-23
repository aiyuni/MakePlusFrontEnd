import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadTableComponent } from './workload-table.component';

describe('WorkloadTableComponent', () => {
  let component: WorkloadTableComponent;
  let fixture: ComponentFixture<WorkloadTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkloadTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkloadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
