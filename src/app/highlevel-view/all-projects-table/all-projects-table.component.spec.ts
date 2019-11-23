import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProjectsTableComponent } from './all-projects-table.component';

describe('AllProjectsTableComponent', () => {
  let component: AllProjectsTableComponent;
  let fixture: ComponentFixture<AllProjectsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProjectsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
