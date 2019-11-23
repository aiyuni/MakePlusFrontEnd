import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationEntryComponent } from './vacation-entry.component';

describe('VacationEntryComponent', () => {
  let component: VacationEntryComponent;
  let fixture: ComponentFixture<VacationEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
