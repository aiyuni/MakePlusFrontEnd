import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllProposalTableComponent } from './all-proposal-table.component';

describe('AllProposalTableComponent', () => {
  let component: AllProposalTableComponent;
  let fixture: ComponentFixture<AllProposalTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllProposalTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllProposalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
