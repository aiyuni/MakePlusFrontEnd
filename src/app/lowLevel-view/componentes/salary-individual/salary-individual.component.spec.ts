import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaryIndividualComponent } from './salary-individual.component';

describe('SalaryIndividualComponent', () => {
  let component: SalaryIndividualComponent;
  let fixture: ComponentFixture<SalaryIndividualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaryIndividualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaryIndividualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
