import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkloadViewComponent } from './workload-view.component';

describe('WorkloadViewComponent', () => {
  let component: WorkloadViewComponent;
  let fixture: ComponentFixture<WorkloadViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkloadViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkloadViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
